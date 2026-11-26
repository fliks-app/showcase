import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideCaptions,
  LucideCloudDownload,
  LucideDynamicIcon,
  LucideEyeOff,
  LucideLanguages,
  LucideMonitorSmartphone,
  LucideUsers,
} from '@lucide/angular';
import { DOCKER_DOWNLOAD_LINES, DOCKER_UP } from '../../core/docker';
import { CodeBlock } from '../../shared/code-block/code-block';
import { ScreenshotTour, TourItem } from '../../shared/screenshot-tour/screenshot-tour';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';

// Client OSes derived from the fliks README platform table (excludes device-only entries like Chromecast).
const OPERATING_SYSTEMS = [
  'Windows',
  'macOS',
  'Linux',
  'iOS',
  'iPadOS',
  'Android',
  'tvOS',
  'Tizen',
  'webOS',
];

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe, ScreenshotTour, CodeBlock, LucideDynamicIcon],
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
        url: 'https://fliks.media/',
        image: 'https://fliks.media/img/social-card.jpg',
        codeRepository: 'https://github.com/fliks-app/fliks',
        sameAs: ['https://github.com/fliks-app/fliks'],
      },
    });
  }

  protected readonly highlights = [
    { group: 'watching', index: 1, icon: LucideLanguages },
    { group: 'watching', index: 2, icon: LucideCaptions },
    { group: 'sharing', index: 0, icon: LucideMonitorSmartphone },
    { group: 'browsing', index: 0, icon: LucideEyeOff },
    { group: 'sharing', index: 4, icon: LucideCloudDownload },
    { group: 'sharing', index: 5, icon: LucideUsers },
  ];

  protected readonly tourItems: TourItem[] = [
    { image: 'img/screenshots/home.webp', labelKey: 'tour.tabs.home', altKey: 'tour.alt.home' },
    {
      image: 'img/screenshots/library.webp',
      labelKey: 'tour.tabs.library',
      altKey: 'tour.alt.library',
    },
    {
      image: 'img/screenshots/detail.webp',
      labelKey: 'tour.tabs.detail',
      altKey: 'tour.alt.detail',
    },
    {
      image: 'img/screenshots/player.webp',
      labelKey: 'tour.tabs.player',
      altKey: 'tour.alt.player',
    },
  ];

  protected readonly dockerDownloadLines = DOCKER_DOWNLOAD_LINES;
  protected readonly dockerUp = DOCKER_UP;
}
