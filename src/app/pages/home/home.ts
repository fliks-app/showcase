import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ScreenshotTour, TourItem } from '../../shared/screenshot-tour/screenshot-tour';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';

const DOCKER_DOWNLOAD_LINES = [
  'curl -LO https://raw.githubusercontent.com/fliks-app/fliks/main/docker-compose.example.yml',
  'mv docker-compose.example.yml docker-compose.yml',
];
const DOCKER_UP = 'docker compose up -d';

// Client OSes derived from the fliks README platform table (excludes device-only entries like Chromecast).
const OPERATING_SYSTEMS = ['Windows', 'macOS', 'Linux', 'iOS', 'iPadOS', 'Android', 'tvOS', 'Tizen', 'webOS'];

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, ScreenshotTour],
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    setPageTitle('meta.title');
    setSeo({
      path: '',
      titleKey: 'meta.title',
      descriptionKey: 'meta.description',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Fliks',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: OPERATING_SYSTEMS,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        url: 'https://fliks-app.github.io/showcase/',
        image: 'https://fliks-app.github.io/showcase/img/og-image.jpg',
        codeRepository: 'https://github.com/fliks-app/fliks',
        sameAs: ['https://github.com/fliks-app/fliks'],
      },
    });
  }

  protected readonly featureGroups = ['watching', 'browsing', 'sharing', 'running'] as const;

  protected readonly tourItems: TourItem[] = [
    { image: 'img/screenshots/home.webp', labelKey: 'tour.tabs.home', altKey: 'tour.alt.home' },
    { image: 'img/screenshots/library.webp', labelKey: 'tour.tabs.library', altKey: 'tour.alt.library' },
    { image: 'img/screenshots/detail.webp', labelKey: 'tour.tabs.detail', altKey: 'tour.alt.detail' },
    { image: 'img/screenshots/player.webp', labelKey: 'tour.tabs.player', altKey: 'tour.alt.player' },
  ];



  protected readonly dockerDownloadLines = DOCKER_DOWNLOAD_LINES;
  protected readonly dockerDownload = DOCKER_DOWNLOAD_LINES.join('\n');
  protected readonly dockerUp = DOCKER_UP;
  protected readonly copiedBlock = signal<string | null>(null);

  copy(text: string, id: string): void {
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        this.copiedBlock.set(id);
        setTimeout(() => {
          if (this.copiedBlock() === id) {
            this.copiedBlock.set(null);
          }
        }, 1500);
      })
      .catch(() => {
        // Clipboard access can be denied; the snippet is still selectable by hand.
      });
  }
}
