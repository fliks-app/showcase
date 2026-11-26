// Latest fliks release, for the download page. Offline, it writes null and the buttons point at the release page.
import { mkdirSync, writeFileSync } from 'node:fs';

const release = await fetch('https://api.github.com/repos/fliks-app/fliks/releases/latest', {
  headers: process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
  signal: AbortSignal.timeout(10_000),
})
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
  .then((r) => ({
    version: r.tag_name.replace(/^v/, ''),
    assets: Object.fromEntries(r.assets.map((a) => [a.name, a.browser_download_url])),
  }))
  .catch((err) => {
    console.warn(
      `latest-release: unavailable (${err.message}); download buttons link to the release page`,
    );
    return null;
  });

mkdirSync('src/generated', { recursive: true });
writeFileSync('src/generated/release.json', JSON.stringify(release));
