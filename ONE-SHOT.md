# One Shot — Point75 page template

**The mantra:** show as much as possible in a single view, without scrolling. Every pixel earns its place. No dead space, no capped text widths, nothing "just sitting there".

Reference implementation: the Pulse page (`pulse/pulse.js`). Header rules are already applied to every page module.

## 1. Header (every page)
- Gold eyebrow label sits **inline** with the title on one line (`.eyebrow:has(+ h1){display:inline-block}`, `h1{display:inline-block}`).
- Title: **28px** desktop, **24px** phones. Serif (Hedvig Letters Serif). **Title Case** for the page's main title only; everything below it is sentence case.
- "Updated …" note right-aligned on the title line where a page has one (`.hd-t .asof{margin-left:auto}`).
- Intro (`.lede`, `.lead`, `.sub`) runs the **full width**, **justified** with hyphens. Never a `max-width` cap on text. On phones, left-aligned.
- Page starts **16px** from the top (12px on phones).

## 2. Spacing
- Section headings (`h2`): ~23–24px, **32px** above, 4px below. First heading in a tab view: 16px above.
- Gaps between cards 14px, card padding ~16–18px. Trim any gap over ~24px unless it separates two unrelated things.
- Main column 1040px for data pages. Long reading pages (Education chapters, Insights) may stay ~760–900px for readable line length. Short forms (Contact) stay narrow.
- Site-wide back / next: on screens ≥1240px they sit in the side margins as slim tabs, halfway down (`p75.js`, `#p75tn`). The top row takes no height there.

## 3. Instruments and dials
- Overview dials: tools-style speedometer (220° sweep, slim track, coloured fill from rest, tapered needle, hub) — `dial()` in `pulse/pulse.js`. Number and label sit **beside** the dial with a short justified note.
- Detail dials: cockpit style (bezel, ticks, digital readout) — `ckStressDial`, `ckBBDial`, `ckVoteDial`.
- No thermometers, no attitude balls, no big boxed tallies. Counts are small rounded pills.
- Needles: start at the **left end of the scale**, short pause (~0.5–0.65s), then an even **4.5s** glide (`cubic-bezier(.37,0,.3,1)`), no spring. Fill arcs move with the needle. Replay the sweep whenever a section opens.
- Colours: bull = fluorescent blue **#1FC8FF**, bear = **#E5484D**, neutral **#9AA0A6**. Stress bands green → lime → amber → red.

## 4. Detail panels (tabs)
- Group detail into **collapsible sections**; each closed row shows its headline reading on the right and a round chevron. **One open at a time.**
- The **info screen** (explanation column, ~350px) appears only while a section is open, already showing that section's first instrument. Text 14.5px.
- Tap cues: hint line with a pulsing gold dot at the top of each open section, "What it means ›" label on every card ("Showing ▸" on the active one), hover lift, one-time glow when a section first opens.
- Phones: explanation opens as a bottom sheet on tap (never automatically).

## 5. Fold-away top
- Picking a tab folds the header and overview dials into a **one-line strip** (eyebrow + key readings + "Show dials" with a gently bobbing down arrow). The tab content slides up into the freed space.
- Stays folded across tabs until the reader taps the strip. Deep links to a tab (`/page#tab`) arrive folded.
- Animate with `grid-template-rows: 1fr ↔ 0fr` (~0.5s); never scroll-jack.

## 6. Every change
- Respect `prefers-reduced-motion` for decoration (no bobbing, pulsing, glow, hover lift, fold animation). **Needle sweeps stay on**: they are how the reading is shown.
- Touch targets ≥ 44px; real `<button>`s with `aria-expanded` / `aria-pressed`.
- **Check for clipped text** at 320, 360, 390, 768, 1024, 1280 and 1440px, open and folded. Nothing may overflow, clip or run off screen.
- Preview before pushing anything that changes behaviour or more than one page; small visual tweaks can go straight to `main`.
