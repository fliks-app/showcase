# Fliks showcase

The marketing site for [Fliks](https://github.com/fliks-app/fliks), a self-hosted media server and streaming app.
Deployed to GitHub Pages at [fliks.media](https://fliks.media/) on every push to `main` (see `.github/workflows/deploy.yml`).

Angular 22, standalone components, zoneless, Tailwind CSS 4 + daisyUI 5, ngx-translate (English and French,
auto-detected). Statically prerendered: `npm run build` outputs real HTML for every route, no server needed.

## Development

```bash
npm start
```

Opens at `http://localhost:4200/`.

## Building

```bash
npm run build
```

Prerendered output lands in `dist/showcase/browser`. Serve it with any static file server, for example
`npx http-server dist/showcase/browser`.

## Updating content

- Copy lives in `public/i18n/en.json` and `public/i18n/fr.json`, loaded at build time (no runtime fetch).
- Screenshots and logos live in `public/img/`.
- Pages are `src/app/pages/home` and `src/app/pages/download`.
