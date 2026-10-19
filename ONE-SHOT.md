# One Shot — Point75 page template

**The mantra:** show as much as possible in a single view, without scrolling. Every pixel earns its place. No dead space, no capped text widths, nothing "just sitting there".

**First principle: crisp, attractive, effortless.** Before building anything, ask how to make the page more crisp, eye-catching and less scrollable, so the reader never spends effort working out what they are looking at and their attention never drifts. In practice:
- The number and the picture speak first; words only where they add meaning. Cut any sentence that repeats what a heading, tab name, label or colour already says.
- One idea per screen. If a section scrolls, split it (tabs, folds) rather than shrinking the text.
- Colour carries meaning (Blue good, Red bad, gold for "look here") and key words glow in their colour.
- Every card and dial is itself the link; no "Check the ..." or "Read more" lines.
- Bright, readable text (no faint grey body copy); generous type for numbers.
- Propose these improvements unprompted, not only when asked.

Reference implementation: the Pulse page (`pulse/pulse.js`). Header rules are already applied to every page module.

## 1. Header (every page)
- Gold eyebrow label sits **inline** with the title on one line (`.eyebrow:has(+ h1){display:inline-block}`, `h1{display:inline-block}`).
- Title: **28px** desktop, **24px** phones. Serif (Hedvig Letters Serif). **Title Case** for the page's main title only; everything below it is sentence case.
- "Updated …" note right-aligned on the title line where a page has one (`.hd-t .asof{margin-left:auto}`).
- Intro (`.lede`, `.lead`, `.sub`) runs the **full width**, **justified** with hyphens. Never a `max-width` cap on text. On phones, left-aligned.
- Page starts **4px** below the menu (desktop and phones). No help or dictionary boxes above the content.

## 2. Spacing
- Section headings (`h2`): ~23–24px, **32px** above, 4px below. First heading in a tab view: 16px above.
- Gaps between cards 14px, card padding ~16–18px. Trim any gap over ~24px unless it separates two unrelated things.
- Disclosures, sources and footnotes sit on **one line** with an ellipsis; a tap shows them in full (`p75.js`, `DISC_SEL`). Add a page's footer selector there.
- Main column 1040px for data pages. Long reading pages (Education chapters, Insights) may stay ~760–900px for readable line length. Short forms (Contact) stay narrow.
- Site-wide back / next: on screens ≥1240px they sit in the side margins as slim tabs, halfway down (`p75.js`, `#p75tn`). The top row takes no height there.

## 3. Instruments and dials
- Overview dials: tools-style speedometer (220° sweep, slim track, coloured fill from rest, tapered needle, hub) — `dial()` in `pulse/pulse.js`. Number and label sit **beside** the dial with a short justified note.
- Detail dials: cockpit style (bezel, ticks, digital readout) — `ckStressDial`, `ckBBDial`, `ckVoteDial`.
- No thermometers, no attitude balls, no big boxed tallies. Counts are small rounded pills.
- Needles: start at the **left end of the scale**, short pause (~0.35s), then an even **2.2s** glide (`cubic-bezier(.37,0,.3,1)`), no spring. Fill arcs move with the needle. Replay the sweep whenever a section opens.
- Colours: bull = fluorescent blue **#1FC8FF**, bear = **#E5484D**, neutral **#9AA0A6**. Stress bands green → lime → amber → red.

## 4. Detail panels (tabs)
- Group detail into **collapsible sections**; each closed row shows its headline reading on the right and a round chevron. **One open at a time.**
- The **info screen** (explanation column, ~350px) appears only while a section is open, already showing that section's first instrument. Text 14.5px.
- Tap cues: hint line with a pulsing gold dot at the top of each open section, "What it means ›" label on every card ("Showing ▸" on the active one), hover lift, one-time glow when a section first opens.
- Phones: explanation opens as a bottom sheet on tap (never automatically).

## 5. Takeaway first
- A page with several tabs opens on a **Takeaway** tab: a headline sentence written from the live numbers by simple rules, a **Watch** line for the most extreme reading, and one card per tab (reading, mini dial where it fits, one plain line, "See why ›" jumping to that tab).
- Takeaway never repeats the detail; it points to it.

## 6. Fold-away top
- Picking a tab folds the header and overview dials into a **one-line strip** (eyebrow + key readings + "Show dials" with a gently bobbing down arrow). The tab content slides up into the freed space.
- Stays folded across tabs until the reader taps the strip. Deep links to a tab (`/page#tab`) arrive folded.
- Animate with `grid-template-rows: 1fr ↔ 0fr` (~0.5s); never scroll-jack.
- On the Takeaway, the top also folds as soon as the reader scrolls down (the content slides up into the space) and unfolds when they scroll back to the top. Skip this when the folded page would no longer scroll (it would bounce). Other tabs keep the strip until it is tapped.
- Phones: tabs stay on one row that slides sideways; never wrap them onto a second row.

## 7. Every change
- Respect `prefers-reduced-motion` for decoration (no bobbing, pulsing, glow, hover lift, fold animation). **Needle sweeps stay on**: they are how the reading is shown.
- Touch targets ≥ 44px; real `<button>`s with `aria-expanded` / `aria-pressed`.
- **Check for clipped text** at 320, 360, 390, 768, 1024, 1280 and 1440px, open and folded. Nothing may overflow, clip or run off screen.
- Preview before pushing anything that changes behaviour or more than one page; small visual tweaks can go straight to `main`.
