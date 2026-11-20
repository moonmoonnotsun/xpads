# Xpads locale tasks

The page title that ships is `locales/seo-extra.mjs` → `meta`, because `scripts/build-locale-pages.mjs` does `{ ...seo[code], ...meta[code] }`. Titles in `locales/home-copy.mjs` do not ship. Edit `meta` in `seo-extra.mjs`. Then either delete `metaTitle` from `home-copy.mjs` or set it to the same string, so the next edit is not made in the dead file.

Keep both spellings in every title: **Beatmaker** and **Beat Maker**, plus **drum pads** and **make beats**. A local word can sit beside them. Do not translate those away. The keyword string in `core` already lists both spellings. The title has to as well.

## Do once

Set every `meta()` first argument to the title in the table. The pattern is `Beatmaker App | Beat Maker — Drum Pads to Make Beats`. The live English title only has the two-word form. That is the gap.

## Titles

| Locale | Write this `metaTitle` |
|---|---|
| en | `Beatmaker App \| Beat Maker — Drum Pads to Make Beats` |
| de | `Beatmaker App \| Beat Maker — Drum Pads für Beats` |
| fr | `Beatmaker App \| Beat Maker — Drum Pads pour faire des beats` |
| fr-CA | `Beatmaker App \| Beat Maker — Drum Pads pour faire des beats au Canada` |
| es | `Beatmaker App \| Beat Maker — Drum Pads para hacer beats` |
| es-MX | `Beatmaker App \| Beat Maker — Drum Pads para hacer beats en México` |
| pt-BR | `Beatmaker App \| Beat Maker — Drum Pads para fazer beats` |
| pt-PT | `Beatmaker App \| Beat Maker — Drum Pads para fazer beats em Portugal` |
| it | `Beatmaker App \| Beat Maker — Drum Pads per fare beat` |
| nl | `Beatmaker App \| Beat Maker — Drum Pads om beats te maken` |
| pl | `Beatmaker App \| Beat Maker — Drum Pads do bitów` |
| cs | `Beatmaker App \| Beat Maker — Drum Pads na beaty` |
| sk | `Beatmaker App \| Beat Maker — Drum Pads na beaty na Slovensku` |
| da | `Beatmaker App \| Beat Maker — Drum Pads til at lave beats` |
| sv | `Beatmaker App \| Beat Maker — Drum Pads för att göra beats` |
| nb | `Beatmaker App \| Beat Maker — Drum Pads for å lage beats` |
| fi | `Beatmaker App \| Beat Maker — Drum Pads biittien tekoon` |
| ca | `Beatmaker App \| Beat Maker — Drum Pads per fer beats` |
| el | `Beatmaker App \| Beat Maker — Drum Pads για beat` |
| hr | `Beatmaker App \| Beat Maker — Drum Pads za beatove` |
| hu | `Beatmaker App \| Beat Maker — Drum Pads beathez` |
| ro | `Beatmaker App \| Beat Maker — Drum Pads pentru beat-uri` |
| tr | `Beatmaker App \| Beat Maker — Drum Pads ile beat yap` |
| id | `Beatmaker App \| Beat Maker — Drum Pads untuk bikin beat` |
| ms | `Beatmaker App \| Beat Maker — Drum Pads untuk buat beat` |
| vi | `Beatmaker App \| Beat Maker — Drum Pads để làm beat` |
| ja | `Beatmaker App \| Beat Maker — Drum Pads ドラムパッドでビート` |
| ko | `Beatmaker App \| Beat Maker — Drum Pads 드럼 패드로 비트` |
| zh-Hans | `Beatmaker App \| Beat Maker — Drum Pads to Make Beats` |
| zh-Hant | `Beatmaker App \| Beat Maker — Drum Pads to Make Beats` |
| ru | `Beatmaker App \| Beat Maker — Drum Pads драм-пэды для битов` |
| uk | `Beatmaker App \| Beat Maker — Drum Pads драм-педи для бітів` |
| ar | `Beatmaker App \| Beat Maker — Drum Pads بادز لصنع البيتس` |
| he | `Beatmaker App \| Beat Maker — Drum Pads פאדים ליצירת ביטים` |
| hi | `Beatmaker App \| Beat Maker — Drum Pads बीट के लिए ड्रम पैड` |
| th | `Beatmaker App \| Beat Maker — Drum Pads ดรัมแพดสำหรับทำบีต` |

fr and fr-CA must not share a title. es and es-MX must not share a title. pt-BR and pt-PT must not share a title. cs and sk must not share a title. The extra place word is enough.

zh-Hans and zh-Hant titles stay the English keyword line. The Chinese noun `鼓垫` means a cushion. Do not put it in the title.

## Body, per locale

All of these are in `locales/seo-extra.mjs` unless noted.

| Locale | Now | Write |
|---|---|---|
| zh-Hans | `鼓垫` and `点鼓垫` in `meta` description, keywords, `seoTitle`, `seoLead`, `seoBody` | `鼓机垫` is still wrong. Use `打击垫` for the pad. Replace `敲垫子` / `点鼓垫` with `敲打击垫`. |
| zh-Hant | `鼓墊`, `點鼓墊`, `敲墊子` | `打擊墊` and `敲打擊墊` |
| zh-Hans, ja, ko, tr, hi | Play-button prefix that says App Store on the Google Play link | Use the same Play prefix the English page uses. On zh-Hans the live prefix is `在 App Store`. |
| cs | `slož beat podle ucha` | `slož beat podle sluchu` |
| hr | `služi za raditi` | `služi za rad` |
| sv | `en beat`, `Gör en beat`, `Öva på en beat` | `ett beat`, `Gör ett beat`, `Öva på ett beat` |
| fi | title `Padit` with no `drum` | title row above. Body may keep `rumpupadeja`. |
| fr, fr-CA | `avec des pads` and title `Pads` | `avec des drum pads` in `seoTitle`. Titles from the table. Give fr-CA its own `seoLead` so the description is not a copy of fr. |
| es | `para sonar batería` if present in `home-copy.mjs` | `para tocar la batería` |
| pt-BR | `toque … e toque` if the same verb is doubled in `home-copy.mjs` | one verb: `toque os drum pads` |
| hu | `fülre` if that is the "by ear" line | `hallás után` |

de already says `Beat Maker` inside `seoLead`. After the title change, no other de edit is required.

Rebuild, then open `zh/index.html` and `ar/index.html`. The `<title>` must contain `Beatmaker`, `Beat Maker`, and `Drum Pads`. The Chinese body must not contain `垫子`.
