# Implementation reference

[Back to the README](../README.md)

This reference describes the visualizer at commit `97f7fc2`. The README redesign changes documentation and illustration assets only.

## Device addresses

The address labels below come from the app’s `nodes` array. They are illustrative; no connection is made to these hosts.

| Device | Displayed IP |
| --- | --- |
| Internet | None |
| Gateway | 192.168.1.1 |
| Core Router | 10.0.0.1 |
| L2 Switch | None |
| Web Server | 10.0.0.10 |
| DB Server | 10.0.0.11 |
| WS-A | 10.0.0.20 |
| WS-B | 10.0.0.21 |
| Attacker | 10.0.0.99 |

The interface also displays illustrative MAC labels. Its attacker label, `00:0c:29:at:tk:er`, is a mnemonic placeholder, not a valid hexadecimal MAC address.

## Connections

The [README network map](readme-assets/network-map.svg) is drawn from all nine link pairs in [index.html](../index.html): Internet–Gateway; Gateway–Core Router; Core Router–L2 Switch; Core Router–Web Server; Core Router–DB Server; L2 Switch–WS-A; L2 Switch–WS-B; L2 Switch–Attacker; L2 Switch–Web Server.

The map depicts modeled connections. Animated paths are narrative illustrations, not a packet-level protocol implementation or a capture of a real network.

## Files and dependencies

| File or directory | Responsibility |
| --- | --- |
| `index.html` | Scenario text, controls, styles, graph, animation, and app state |
| `vendor/` | Bundled D3 and Lucide libraries |
| `assets/audio/` | Optional packet sound effects |
| `sw.js` | Service worker caching |
| `manifest.json` and icons | Install metadata and icons |
| `screenshots/` | Recorded interface images |
| `tests/mobile-regression.cjs` | Optional Playwright checks |
| `docs/readme-assets/` | Documentation artwork; not loaded by the application |

Serve the repository root, not just `index.html`. Google Fonts is an external request with system-font fallbacks. Core visualization does not require an API service. Opening the HTML directly is not the recommended way to verify installation or offline caching; use localhost or HTTPS.

## References displayed by the app

These are the links present in the current implementation, recorded for traceability. They are **not a newly validated mapping** of each scenario to a complete framework technique. ATT&CK and ATLAS are different resources; scenario coverage and source revisions need their own content review.

- ARP spoofing: [T1557.002](https://attack.mitre.org/techniques/T1557/002/)
- MAC flooding: [T1498](https://attack.mitre.org/techniques/T1498/)
- SYN flood: [T1498.001](https://attack.mitre.org/techniques/T1498/001/)
- DHCP starvation and rogue DHCP: [T1557](https://attack.mitre.org/techniques/T1557/)
- ICMP redirect: [T1562.001](https://attack.mitre.org/techniques/T1562/001/)
- Lateral movement: [T1021.001](https://attack.mitre.org/techniques/T1021/001/)
- Harvest now, decrypt later: [T1040](https://attack.mitre.org/techniques/T1040/)
- AI model poisoning: [AML.T0020](https://atlas.mitre.org/techniques/AML.T0020)
- Indirect prompt injection: [AML.T0051](https://atlas.mitre.org/techniques/AML.T0051)
- AI supply chain attack: [AML.T0048](https://atlas.mitre.org/techniques/AML.T0048)

The ARP reference was retrieved during this documentation review. The attempted ATLAS technique fetch did not resolve in the source-reading tool, and the ICMP reference returned no readable content there. Their URLs are retained from the app without a claim of current verification. The old README’s blanket attribution to NIST/CISA and its ATT&CK version badge were removed because they were not substantiated by a complete citation trail.

## Reading the test evidence

[validation.txt](validation.txt) records the earlier visualizer regression run: all 38 steps, navigation/reset behavior, cancellation, reduced motion, and six viewport/input combinations in Chromium. It does not establish universal browser support, physical-device coverage, security correctness, or educational effectiveness.

The [implementation review](ten-pass-review.md) includes reproduction instructions. The [README review](readme-review.md) records the documentation checks separately.
