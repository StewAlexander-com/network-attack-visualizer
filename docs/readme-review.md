# README review and art direction

Reviewed 2026-10-15 against the visualizer at `97f7fc2`. This is a documentation-only change.

## Theme reference

The rendered [stewalexander.com homepage](https://www.stewalexander.com/) supplied the editorial direction: deep navy surfaces, ivory Georgia headings, muted gold eyebrow text and rules, pale teal links, spacious composition, and thin line icons. Its plainspoken focus on practical tools informed the copy. The README uses original SVG artwork; no homepage photography was copied. GitHub controls the prose typography, so the serif treatment is confined to the illustration assets.

Observed colors: navy `#131e26` (artwork approximation), ivory `#f7f3e9`, muted copy `#bfccd3`, gold `#d9bd8e`, teal `#b9dcd6`, and borders `#354953`. The source's text and accent values were read from rendered styles. The artwork adds a muted coral threat-source accent.

## Ten lenses, strongest objections, and retained decisions

| Lens | Strongest objection to the proposed improvement | Decision retained after review |
| --- | --- | --- |
| 1. First-time reader | A stylish opening can obscure what the product actually does. | State the learning task, 10 scenarios, 38 steps, and direct launch link before technical detail. |
| 2. Brand continuity | Rebranding can imply the app itself changed or bury the product in personal branding. | Apply the homepage palette and editorial feel only to documentation art; show unchanged current screenshots. |
| 3. Security accuracy | A confident animation can look like a faithful network simulator or a security verdict. | Explain the scripted model early, separate impacted/compromised states, and retain the “No compromise shown” qualification. |
| 4. Teaching value | Replacing all prose with pictures loses the causal explanation. | Use a learning-flow diagram for sequence; retain What/Why/Result and the defense explanation in searchable text. |
| 5. Information hierarchy | Shortening a README can remove useful engineering references. | Keep the launch path concise, move address/dependency detail to a linked reference, and retain familiar section anchors. |
| 6. Scenario selection | A dense framework table is precise but difficult to scan on a phone. | Use two-column scenario/concept tables grouped into fundamentals and quantum/AI; keep existing app references separately with verification limits. |
| 7. Network diagram | A simplified drawing can change topology or imply a false route. | Match all nine nodes and nine links to the implementation, including both Web Server connections. Label the drawing schematic. |
| 8. Accessibility | Graphic text can become tiny, inaccessible, or disappear when images fail. | Provide separately composed mobile SVGs, descriptive alternative text, native Markdown explanations, and working textual links. |
| 9. Maintainer trust | Badges and claims about offline use, robustness, licensing, or testing can exceed the evidence. | Remove the unsupported endorsement/version claims; describe caching conditions, test limits, supporting assets, and the missing standalone license file plainly. |
| 10. Non-regression | Documentation polish can accidentally replace fresh screenshots or alter runtime assets. | Reuse the latest screenshots and leave application code, service worker, manifest, vendor files, audio, and browser tests byte-identical to `97f7fc2`. |

## Graphic polish

- Original editorial header: an abstract connection motif and clear hierarchy, with no fake app interface or novelty character.
- Learning flow: choose, observe, explain, defend. A horizontal desktop composition becomes a vertical sequence on phones.
- Network map: equipment silhouettes and accurate modeled links. The phone version is independently arranged and typeset.
- Tables serve comparison; diagrams serve relationships; screenshots demonstrate the real interface. Important meaning remains in ordinary Markdown.
- All artwork is self-contained SVG with accessible title/description, no script, no external fonts, and no embedded remote resources.

## Validation

Validation results are recorded in `readme-validation.txt` after rendering and link/asset checks. The preview uses GitHub-rendered Markdown in a local wrapper; it is not a published GitHub README. The current application’s functional validation remains in `validation.txt`, unchanged.
