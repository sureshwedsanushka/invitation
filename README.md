# Suresh & Anushka — wedding invitation

All invitation routes use the same page layouts, artwork, styles, and animations. Route-specific content is configured in `src/invite-config.ts` and applies to both languages.

The GitHub Pages deployment target is <https://sureshwedsanushka.github.io/invitation/>. GitHub Pages requires this project repository to be public on the free plan, which makes the source and invitation artwork publicly viewable.

| Route | Family invitation | Events |
| --- | --- | --- |
| `/v1` | Suresh with Anushka | Wedding only; Mehendi, Haldi, Sangeet and Cocktails omitted |
| `/VAMHS` | Anushka with Suresh | Mehendi, Haldi, Sangeet and Cocktails, Wedding |
| `/VAMH` | Anushka with Suresh | Mehendi, Haldi, Wedding |
| `/VAHS` | Anushka with Suresh | Haldi, Sangeet and Cocktails, Wedding; Mehendi omitted |
| `/VAS` | Anushka with Suresh | Sangeet and Cocktails, Wedding; Mehendi and Haldi omitted |
| `/VA` | Anushka with Suresh | Wedding only; Mehendi, Haldi, Sangeet and Cocktails omitted |
| `/VSHS` | Suresh with Anushka | Haldi, Sangeet and Cocktails, Wedding |
| `/VSH` | Suresh with Anushka | Haldi, Wedding |

`/VSHS` uses the groom's parents first and the corresponding son/daughter wording on the family page. Its Haldi venue is G-704, A.M Residency, 35 Nesbit Road, opposite Mazagaon court, Mumbai - 400010, using the supplied location link. The cover, announcement, Sangeet, and Wedding pages match `/VAMHS`. `/v1` now shares the groom-side content with `/VSHS`, with Mehendi, Haldi, and Sangeet omitted.

`/VSH` shares the same groom invitation configuration as `/VSHS`, with only Sangeet omitted. Changes to their shared content apply to both routes.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:5173/v1`, `/VAMHS`, `/VAMH`, `/VAHS`, `/VAS`, `/VA`, `/VSHS`, or `/VSH`. To build the static site into `dist/`, run:

```sh
npm run build
```

GitHub Pages builds use `npm run build:pages`, which also creates the fallback page used by direct links to each invitation route.

## Project files

- `src/v1.ts` and the adjacent `v1-*` files contain the invitation pages, interactions, language copy, and styles.
- `src/main.tsx` accepts the routes defined in `src/invite-config.ts` and loads the shared `src/v1.ts` entry point.
- `src/invite-config.ts` contains only route-specific page selections and content overrides, including the `/VSHS` Haldi address.
- `public/canva-pages.json` supplies the layered page artwork used by the invitation.
- `public/assets/` contains the shared artwork, fonts, music, and page-specific illustrations.
