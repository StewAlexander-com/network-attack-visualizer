# Mobile and visual experience: ten-pass review

2026-10-15. Implemented locally; no publication or deployment performed.

## Design constraint

Use the useful parts of game design: readable silhouettes, direction, responsive feedback, clear progression, and continuity of state. Keep the existing dark technical identity. Sound is opt-in, and the graph uses vector graphics rather than novelty characters or decorative imagery.

## Cumulative passes

1. **Available space.** Does a narrow screen actually receive a usable layout? The old breakpoint depended on pointer hardware, so a narrow window with a mouse retained the desktop sidebar. CSS and JavaScript now agree on compact chrome through 1000px.
2. **Occlusion.** Can the graph and controls occupy the same pixels? The old code reserved 120px for a peek panel that could show 240px. The graph, scene summary, and navigation now occupy real layout space; SVG sizing follows its rendered viewport.
3. **Small-screen composition.** Can all nine devices remain legible? Portrait has a dedicated topology; short screens omit IP labels while preserving them in device inspection. Small phones retain at least 44px control targets. The full title is available without opening the drawer.
4. **Orientation and navigation.** Does landscape work at all? An existing rotation overlay blocked it. Landscape now has a wide graph and a separate summary column. Start, Next, Back, Reset, and Details have visible labels. The selector stays on the current scenario after reset.
5. **Visual language.** Do the graphics explain device roles? Replaced Unicode glyphs and the skull with consistent SVG equipment and threat-source icons. Added a subtle grid, restrained depth, clearer labels and explicit state badges. IP addresses remain available by selecting a device.
6. **Packet readability.** Can someone follow direction and meaning? Added directional trails and curved direct paths, retaining packet colors across forwarding hops. Removed the neon forwarding recolor. Corrected the invalid D3 easing name that caused arrival pulse errors. Sound is off by default with an explicit toggle.
7. **Playback integrity.** Does old activity leak into new steps? All scenario timers now belong to a playback generation, and D3 transitions are interrupted on reset/change. Back restores earlier state synchronously and animates the selected step. Resizing redraws and replays the current step against the new positions.
8. **Details and accessibility.** Can users inspect and return reliably? The drawer has focus placement, focus containment, Escape, focus return, inert background, and reachable scrolling. Rendered inspection caught and corrected a visibility-specificity conflict. Device inspection works from the keyboard; tooltips measure their real dimensions. SWOT disclosures use native buttons on mobile.
9. **Motion and state semantics.** Does polish communicate the right facts? Reduced-motion mode uses static routes, skips moving packets and arrival pulses, and still reaches outcomes. SYN exhaustion is shown as service impact rather than attacker ownership. ARP poisoning, route poisoning, CAM overflow and DHCP exhaustion mark relevant impacted nodes. Unchanged nodes say “No compromise shown,” not “Secure.” This is a visual-state correction, not a full audit of the educational content.
10. **Rendered regression.** Do the changes survive actual interaction? Ran all 38 scenario steps, Back, final outcome, Reset, delayed-callback cancellation, rapid input, rotation, drawer scrolling/focus, tooltip bounds, theme and sound toggles. Checked six viewport/input combinations. Updated screenshots and saved the executable checks and raw results.

## Verification

- Chromium: all 38 steps across all ten scenarios passed in reduced-motion mode, including outcome rings, Back and Reset.
- Normal-motion cancellation: resetting or changing scenarios left no packets or packet-log entries from the prior playback.
- Portrait: 320×568 and 390×844.
- Landscape: 844×390.
- Narrow mouse window: 600×800.
- Tablet and desktop: 1024×768 and 1440×900.
- Geometry checks: no page horizontal overflow, clipped node labels, or overlapping node labels at those sizes; compact controls at least 44×44px.
- No uncaught page errors or application `safeExec` warnings during the suite.
- JavaScript syntax checks and `git diff --check` passed.
- Automated screenshots use system font fallbacks by blocking the external font stylesheet, so the regression suite does not depend on Google Fonts.
- Safari/WebKit and physical iOS/Android devices were **not verified**: the local WebKit runtime is not installed. These checks are browser emulation, not device testing.

See [raw results](validation.txt) and [browser regression script](../tests/mobile-regression.cjs).

## Run again

Serve the repository with `python3 -m http.server 8873 --bind 127.0.0.1`. With Playwright and its Chromium runtime installed in your development environment, run:

```sh
BASE_URL=http://127.0.0.1:8873 OUTPUT_DIR=/tmp/netattack-checks node tests/mobile-regression.cjs
```

If Playwright is installed outside this repository, set `PLAYWRIGHT_MODULE_PATH` to its module directory. No production build step or dependency was added.
