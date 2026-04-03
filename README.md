# Network Attack Visualizer

## [Launch Live Demo](https://stewalexander-com.github.io/network-attack-visualizer/)

> Interactive Layer 2/3 network attack visualization — D3.js, zero backend, GitHub Pages

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge)](https://stewalexander-com.github.io/network-attack-visualizer/)
[![MITRE ATT&CK](https://img.shields.io/badge/MITRE%20ATT%26CK-v14-red?style=for-the-badge)](https://attack.mitre.org)

Watch six classic network attacks unfold in real time on an interactive topology. Each scenario animates packet flow, shows ARP/routing table corruption, and links to the corresponding MITRE ATT&CK technique — with detection and mitigation guidance built in.

Works on desktop, tablet, and mobile. Zero backend. Offline after first load.

---

## Attack Scenarios

| Scenario | MITRE ID | Kill Chain Phase | Key Concept |
|---|---|---|---|
| ARP Spoofing (MITM) | [T1557.002](https://attack.mitre.org/techniques/T1557/002/) | Collection → Credential Access | Gratuitous ARP poisons victim + gateway tables |
| MAC Flooding (CAM Overflow) | [T1498](https://attack.mitre.org/techniques/T1498/) | Defense Evasion → Discovery | CAM table overflow degrades switch to hub mode |
| SYN Flood | [T1498.001](https://attack.mitre.org/techniques/T1498/001/) | Impact | Spoofed SYN packets exhaust server half-open queue |
| DHCP Starvation + Rogue DHCP | [T1557](https://attack.mitre.org/techniques/T1557/) | Initial Access → Credential Access | Pool exhaustion enables rogue DHCP gateway injection |
| ICMP Redirect | [T1562.001](https://attack.mitre.org/techniques/T1562/001/) | Defense Evasion | ICMP Type 5 rewrites victim routing table |
| Lateral Movement (SMB/RDP) | [T1021.001](https://attack.mitre.org/techniques/T1021/001/) / [T1021.002](https://attack.mitre.org/techniques/T1021/002/) | Lateral Movement | Internal port scan → SMB pivot → credential reuse |

## Features

- **6 animated attack scenarios** with step-by-step progression
- **Interactive network topology** — tap/click nodes for IP, MAC, role, and compromise state
- **Live packet capture table** with protocol and flag data
- **MITRE ATT&CK mapping** with clickable technique IDs
- **Detection + Mitigation** callouts for each scenario
- **Transport controls** — play, pause, reset with 0.5×–3× speed
- **Baseline traffic toggle** — normal network activity alongside attacks
- **Dark/Light mode** toggle with meta theme-color for mobile browser chrome
- **Mobile-first responsive** — bottom control bar, drawer panel, touch-optimized targets
- **Offline-capable** — works after first load, zero backend
- **Fault-tolerant** — CDN fallbacks (jsDelivr → cdnjs → unpkg), graceful degradation, try/catch around all animation chains
- **Battery-friendly** — Page Visibility API pauses animations when tab is hidden
- **Reduced motion** — respects `prefers-reduced-motion`
- **Safe area aware** — iPhone notch/Dynamic Island support via `env(safe-area-inset-*)`

## Resilience

| Failure Mode | Graceful Fallback |
|---|---|
| D3.js CDN down | Automatic failover: jsDelivr → cdnjs |
| Lucide CDN down | Automatic failover: jsDelivr → unpkg; app runs with Unicode icons |
| Both CDNs fail | User sees notice; app structure still renders |
| Animation error | `safeExec` wraps all steps — one failure doesn't kill the chain |
| Tab hidden/backgrounded | Visibility API pauses all timers and animations |
| Resize/orientation change | Debounced re-render, drawers auto-close |
| Touch vs mouse | Invisible enlarged touch targets (30px radius) on touch devices |
| iOS Safari gestures | `gesturestart` prevented; `touch-action: manipulation` globally |
| Notched phones | `viewport-fit=cover` + `env(safe-area-inset-*)` padding |

## Tech Stack

- **D3.js v7** — force graph positioning + packet animation engine
- **Lucide Icons** — node type icons and UI controls
- **Space Grotesk + JetBrains Mono** — Google Fonts for UI and code display
- **Zero backend** — pure static HTML, all CSS/JS inline
- **GitHub Actions** — auto-deploy to GitHub Pages on push to `main`

## Run Locally

```bash
git clone https://github.com/StewAlexander-com/network-attack-visualizer
cd network-attack-visualizer
python3 -m http.server 8080
# Open http://localhost:8080
```

Or open `index.html` directly in any modern browser — works from `file://`.

## Network Topology

```
INTERNET ──── GATEWAY/FIREWALL ──── CORE ROUTER (L3)
                                        │
                              ┌─────────┤─────────┐
                           L2 SWITCH         WEB SERVER
                        ┌──────┤──────┐         │
                    WS-A     WS-B   ATTACKER   DB SERVER
                  (victim)          (kali)
```

9 nodes, 9 edges. Fixed-position layout, responsive to viewport.

## Why This Exists

This project activates five leverage types simultaneously:

- **Time**: Runs without me — explains L2/L3 attacks 24/7 to anyone with a browser
- **Financial**: Live demo closes consulting conversations faster than a resume bullet
- **Network**: Bridges ops + security audiences in one artifact
- **Knowledge**: D3 packet animation proves depth without claiming it
- **Strategic**: Compounding SEO + GitHub stars asset — value increases over time

## License

MIT
