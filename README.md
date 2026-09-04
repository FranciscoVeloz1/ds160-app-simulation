# DS-160 Personal Copy / Copia personal

Client-only rehearsal of DS-160 *personal copy* questions. **Not CEAC.** It does not submit anything to the U.S. Department of State.

Live (after Pages is enabled): https://franciscoveloz1.github.io/ds160-app-simulation/

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL. Vite base is `/ds160-app-simulation/`, so local preview may live at `http://localhost:5173/ds160-app-simulation/`.

```bash
npm test
npm run lint
npm run build
```

## Import / export

- **Export JSON** — `ds160-personal-copy.json` (ids + answers only).
- **Import** — same JSON shape. Invalid files leave the form unchanged.
- **Export Excel** — columns `Label (EN)`, `Etiqueta (ES)`, `Value`.

There is no autosave. Refresh clears the form. Export is the save path.

## Privacy

Do not commit `png/` scans or `*.pdf` personal copies. Those paths are gitignored. This app does not upload answers.

## GitHub Pages

Settings → Pages → Source = **GitHub Actions**. Push to `main` runs `.github/workflows/deploy.yml`.
