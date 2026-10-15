// Run against a local HTTP server. Requires Playwright; no production dependencies.
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8873';
const out = process.env.OUTPUT_DIR || '/tmp/netattack-checks';
fs.mkdirSync(out,{recursive:true});
const results = [];
async function open(browser, options={}) {
 const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,serviceWorkers:'block',...options});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='warning'&&m.text().includes('[NetAttack'))errors.push(m.text())});
 await page.route('https://fonts.googleapis.com/**',r=>r.abort());
 await page.goto(base,{waitUntil:'load'});await page.locator('#splashCta').click();await page.waitForTimeout(250);
 return {page, errors};
}
async function clear(page){await page.locator('#mBtnReset').click();await page.waitForTimeout(450)}
async function next(page){await page.locator('#mBtnNext').click();await page.waitForTimeout(450)}
(async()=>{
const browser=await chromium.launch({headless:true});
// All scenario progression, backwards reconstruction, outcome and reset.
{
 const {page,errors}=await open(browser,{reducedMotion:'reduce'});
 for(let scenario=0;scenario<10;scenario++){
  await page.selectOption('#mobileAttackSelect',String(scenario));await page.waitForTimeout(150);
  const total=await page.locator('.step-item').count();
  for(let step=0;step<total;step++){
   await next(page);
   assert.match(await page.locator('#sceneStep').innerText(),new RegExp(`STEP ${step+1} / ${total}`));
   assert.equal(await page.locator('.step-item.active').count(),1);
   assert.equal(await page.locator('.packet-dot').count(),0,'reduced motion must not animate packets');
   assert.equal(await page.locator('.arrival-pulse').count(),0,'reduced motion must not pulse');
  }
  assert.equal(await page.locator('#mBtnNext').isDisabled(),true);
  assert.equal(await page.locator('#panelResult.visible').count(),1);
  assert.equal(await page.locator('.end-state-ring').count(),9);
  if(scenario===0)assert.equal(await page.locator('.node-impacted').count(),2);
  if(scenario===2){assert.equal(await page.locator('.node-owned').count(),0);assert.equal(await page.locator('.node-impacted').count(),1)}
  await page.locator('#mBtnPrev').click();await page.waitForTimeout(450);
  assert.match(await page.locator('#sceneStep').innerText(),new RegExp(`STEP ${total-1} / ${total}`));
  assert.equal(await page.locator('#mBtnNext').isEnabled(),true);
  assert.equal(await page.locator('#panelResult.visible').count(),0);
  await clear(page);
  assert.equal(await page.locator('.packet-dot,.flow-trail,.end-state-ring,.status-badge').count(),0);
  assert.equal(await page.locator('#packetTableBody tr').count(),0);
  assert.equal(await page.locator('#mobileAttackSelect').inputValue(),String(scenario));
  results.push(`Scenario ${scenario+1}: ${total} steps, Back, outcome, Reset, reduced motion PASS`);
 }
 assert.deepEqual(errors,[]);await page.close();
}
// Real-time cancellation: a reset/switch must invalidate timers and chained D3 completions.
{
 const {page,errors}=await open(browser);
 await next(page);await clear(page);await page.waitForTimeout(2000);
 assert.equal(await page.locator('.packet-dot,.flow-trail,.arrival-pulse,#packetTableBody tr').count(),0);
 await next(page);await page.selectOption('#mobileAttackSelect','5');await next(page);await page.waitForTimeout(2000);
 assert.equal(await page.locator('#packetTableBody tr').count(),1,'old ARP callbacks must not contaminate lateral movement');
 assert.equal(await page.locator('.node-owned').count(),1);
 // Repeated rapid input remains bounded.
 await page.locator('#mBtnNext').dblclick();await page.waitForTimeout(450);
 assert.match(await page.locator('#sceneStep').innerText(),/STEP 2 \/ 4/);
 await page.setViewportSize({width:844,height:390});await page.waitForTimeout(500);
 assert.match(await page.locator('#sceneStep').innerText(),/STEP 2 \/ 4/);
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
 // Keyboard focus, dismiss, scroll and accessible disclosures.
 await page.locator('#sceneDetails').click();await page.waitForTimeout(350);
 assert.equal(await page.locator('#detail-panel').getAttribute('aria-modal'),'true');
 assert.equal(await page.locator('#drawerCloseBtn').evaluate(el=>document.activeElement===el),true);
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>!!document.activeElement.closest('#detail-panel')),true);
 const swot=page.locator('.step-item.active .swot-label').first();await swot.click();
 assert.equal(await swot.getAttribute('aria-expanded'),'true');
 await page.locator('#panelMitigation').scrollIntoViewIfNeeded();
 assert.equal(await page.locator('#panelMitigation').isVisible(),true);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#sceneDetails').evaluate(el=>document.activeElement===el),true);
 assert.equal(await page.locator('#detail-panel').evaluate(el=>el.inert),true);
 // Tooltip bounds at each edge and keyboard device activation.
 for(const id of ['internet','server-b','attacker']){
  await page.locator(`.node-group[data-id="${id}"]`).focus();await page.keyboard.press('Enter');
  const box=await page.locator('#nodeTooltip').boundingBox();assert(box.x>=0&&box.x+box.width<=390);
  const canvas=await page.locator('#canvas-container').boundingBox();assert(box.y>=canvas.y&&box.y+box.height<=canvas.y+canvas.height+1);
  await page.keyboard.press('Escape');
 }
 // Switch themes and opt-in sound toggles without changing playback.
 await page.locator('#themeToggle').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 assert.equal(await page.locator('#soundToggle').getAttribute('aria-pressed'),'false');
 await page.locator('#soundToggle').click();assert.equal(await page.locator('#soundToggle').getAttribute('aria-pressed'),'true');
 await page.locator('#soundToggle').click();assert.equal(await page.locator('#soundToggle').getAttribute('aria-pressed'),'false');
 await page.screenshot({path:out+'/mobile-light.png'});
 assert.deepEqual(errors,[]);await page.close();results.push('Animation cancellation, rapid input, rotation, drawer keyboard/scroll, tooltips, theme, sound PASS');
}
// Responsive geometry, including narrow fine-pointer desktops.
for(const [name,width,height,touch] of [['small',320,568,true],['mobile',390,844,true],['landscape',844,390,true],['narrow-mouse',600,800,false],['tablet',1024,768,true],['desktop',1440,900,false]]){
 const {page,errors}=await open(browser,{viewport:{width,height},hasTouch:touch,isMobile:touch});
 await page.locator(width<=1000?'#mBtnNext':'#btnNext').click();await page.waitForTimeout(500);
 const geometry=await page.evaluate(()=>{
  const canvas=document.querySelector('#canvas-container').getBoundingClientRect();
  const labels=[...document.querySelectorAll('.node-label')].map(el=>el.getBoundingClientRect());
  return {overflow:document.documentElement.scrollWidth>innerWidth,clipped:labels.some(r=>r.left<canvas.left||r.right>canvas.right||r.top<canvas.top||r.bottom>canvas.bottom),overlaps:labels.some((r,i)=>labels.slice(i+1).some(t=>r.left<t.right&&r.right>t.left&&r.top<t.bottom&&r.bottom>t.top))};
 });
 assert.deepEqual(geometry,{overflow:false,clipped:false,overlaps:false},name);
 if(width<=1000){
  for(const id of ['mBtnPrev','mBtnNext','mBtnReset','mobileInfoBtn','mobileAttackSelect','themeToggle','soundToggle']){const r=await page.locator('#'+id).boundingBox();assert(r.width>=44&&r.height>=44,id+' hit area')}
 }
 await page.screenshot({path:out+'/'+name+'.png'});
 if(width<=1000){await page.locator('#sceneDetails').click();await page.waitForTimeout(350);assert.equal(await page.locator('#drawerCloseBtn').isVisible(),true);await page.screenshot({path:out+'/'+name+'-drawer.png'});await page.keyboard.press('Escape')}
 assert.deepEqual(errors,[],name);await page.close();results.push(`${name} ${width}×${height}: bounds, labels, controls, drawer PASS`);
}
await browser.close();
// WebKit is supplementary; a missing installed runtime is reported explicitly.
try {
 const safari=await webkit.launch({headless:true});const {page,errors}=await open(safari);
 await next(page);await page.locator('#sceneDetails').click();await page.waitForTimeout(350);
 assert.equal(await page.locator('#drawerCloseBtn').isVisible(),true);await page.locator('#drawerCloseBtn').click();
 assert.equal(await page.locator('#detail-panel').evaluate(el=>el.inert),true);
 assert.deepEqual(errors,[]);await page.screenshot({path:out+'/webkit-mobile.png'});await safari.close();results.push('WebKit mobile: start, drawer, close PASS');
} catch(e) {if(/Executable doesn't exist|browserType.launch/.test(e.message)) results.push('WebKit unavailable: '+e.message.split('\n')[0]);else throw e;}
fs.writeFileSync(out+'/validation.txt',results.join('\n')+'\n');console.log(results.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
