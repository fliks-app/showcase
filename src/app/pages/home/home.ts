import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ScreenshotTour, TourItem } from '../../shared/screenshot-tour/screenshot-tour';
import { setPageTitle } from '../../core/page-title';

const DOCKER_DOWNLOAD_LINES = [
  'curl -LO https://raw.githubusercontent.com/fliks-app/fliks/main/docker-compose.example.yml',
  'mv docker-compose.example.yml docker-compose.yml',
];
const DOCKER_UP = 'docker compose up -d';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, ScreenshotTour],
  templateUrl: './home.html',
})
export class Home {
  constructor() {
    setPageTitle('meta.title');
  }

  protected readonly heroImage = 'img/screenshots/detail.webp';
  protected readonly featureGroups = ['watching', 'browsing', 'sharing', 'running'] as const;

  protected readonly tourItems: TourItem[] = [
    { image: 'img/screenshots/home.webp', labelKey: 'tour.tabs.home', altKey: 'tour.alt.home' },
    { image: 'img/screenshots/library.webp', labelKey: 'tour.tabs.library', altKey: 'tour.alt.library' },
    { image: 'img/screenshots/detail.webp', labelKey: 'tour.tabs.detail', altKey: 'tour.alt.detail' },
    { image: 'img/screenshots/player.webp', labelKey: 'tour.tabs.player', altKey: 'tour.alt.player' },
  ];

  protected readonly appletvItems: TourItem[] = [
    { image: 'img/tv/appletv-home.webp', labelKey: 'tour.tabs.home', altKey: 'tv.alt.appletvHome' },
    { image: 'img/tv/appletv-library.webp', labelKey: 'tour.tabs.library', altKey: 'tv.alt.appletvLibrary' },
    { image: 'img/tv/appletv-detail.webp', labelKey: 'tour.tabs.detail', altKey: 'tv.alt.appletvDetail' },
    { image: 'img/tv/appletv-player.webp', labelKey: 'tour.tabs.player', altKey: 'tv.alt.appletvPlayer' },
  ];

  protected readonly tizenItems: TourItem[] = [
    { image: 'img/tv/tizen-detail.webp', labelKey: 'tour.tabs.detail', altKey: 'tv.alt.tizenDetail' },
    { image: 'img/tv/tizen-player.webp', labelKey: 'tour.tabs.player', altKey: 'tv.alt.tizenPlayer' },
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
