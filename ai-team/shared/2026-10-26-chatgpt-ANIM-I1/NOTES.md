Job: ANIM-I1 — Costumes / Flipbook / Animation icon consistency audit
By: ChatGPT GPT-6
Date (UTC): 2026-10-26

What it is: A source-only inventory of the current icon choices for matching actions in Costumes, Flipbook, Animation, Code and Sounds/Song Maker. Includes a visual preview of the current mismatch and the recommended common icon language.
Where it goes in G-Warp: Audit/reference only. No app element is changed by this package.
Options: A = keep the existing shared Font Awesome action icons for undo/redo; B = use the existing Gemini custom icon family for the cross-tab play/onion actions; C = invent a new family. My pick: B for play/onion only, while preserving the existing undo/redo icons, because G-Warp already has the custom animation icon family in app.html.
How Claude plugs it in: No code integration required for ANIM-I1. Use the audit table as the icon-normalization checklist. For any icon change, keep the same action's icon consistent everywhere and retain current button behavior and labels.
How to test: Open preview.html in a browser. Compare the rows and the dark/light samples. Then verify the selected icon mapping in the real app during a separate browser QA pass.
Evidence: SOURCE-VERIFIED (app.html blob 7ef2e8d17081354e66fc6138ae9cc8a639b839d9; no browser test).
Credits / licences: Existing icon identifiers/assets are already present in G-Warp source (Font Awesome classes and Gemini animation SVGs); preview glyphs are original simple inline SVG approximations for audit display only.
