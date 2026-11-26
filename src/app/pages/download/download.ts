import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideDownload,
  LucideDynamicIcon,
  LucideExternalLink,
  LucideGlobe,
  LucideMonitor,
  LucideSmartphone,
  LucideTv,
} from '@lucide/angular';
import releaseJson from '../../../generated/release.json';
import { DOCKER_DOWNLOAD_LINES, DOCKER_UP } from '../../core/docker';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';
import { CodeBlock } from '../../shared/code-block/code-block';

type Release = { version: string; assets: Record<string, string> } | null;
const release = releaseJson as unknown as Release;

const RELEASE_PAGE = 'https://github.com/fliks-app/fliks/releases/latest';
const DOCS = 'https://docs.fliks.media';
const APP_STORE = 'https://apps.apple.com/app/fliks/id6771854507';
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=media.fliks.app';
const LG_STORE = 'https://fr.lgappstv.com/main/tvapp/detail?appId=1307413';

interface Link {
  label: string;
  href: string;
  store?: boolean;
}

/** A file of the latest release, `{v}` standing for its version; the release page when it's unknown. */
function file(label: string, name: string): Link {
  const href = release?.assets[name.replaceAll('{v}', release.version)] ?? RELEASE_PAGE;
  return { label, href };
}

const store = (label: string, href: string): Link => ({ label, href, store: true });

const APT_LINES = [
  'sudo curl -fsSLo /etc/apt/sources.list.d/fliks.sources https://github.com/fliks-app/fliks/releases/download/apt/fliks.sources',
  'sudo apt update && sudo apt install fliks-desktop',
];

@Component({
  selector: 'app-download',
  imports: [TranslatePipe, CodeBlock, LucideDynamicIcon, LucideDownload, LucideExternalLink],
  templateUrl: './download.html',
})
export class Download {
  constructor() {
    setPageTitle('download.metaTitle');
    setSeo({
      path: 'download',
      titleKey: 'download.metaTitle',
      descriptionKey: 'download.metaDescription',
    });
  }

  protected readonly version = release?.version;
  protected readonly releasePage = RELEASE_PAGE;
  protected readonly aptLines = APT_LINES;

  protected readonly serverTabs = [
    {
      id: 'docker',
      code: [...DOCKER_DOWNLOAD_LINES, ...DOCKER_UP],
      links: [],
      doc: `${DOCS}/install/docker`,
    },
    {
      id: 'windows',
      links: [file('.exe', 'Fliks-Server-{v}-Setup.exe')],
      doc: `${DOCS}/install/windows`,
    },
    {
      id: 'macos',
      links: [file('.dmg', 'Fliks-Server-{v}-arm64.dmg')],
      doc: `${DOCS}/install/macos`,
    },
    { id: 'truenas', links: [], doc: `${DOCS}/install/truenas` },
    { id: 'source', links: [], doc: `${DOCS}/install/from-source` },
  ];

  protected readonly clientGroups = [
    {
      id: 'computer',
      icon: LucideMonitor,
      platforms: [
        {
          id: 'windows',
          doc: `${DOCS}/clients/desktop`,
          links: [file('.exe', 'Fliks-Client-{v}-Setup.exe')],
        },
        {
          id: 'macos',
          doc: `${DOCS}/clients/desktop`,
          links: [store('Mac App Store', APP_STORE), file('.dmg', 'Fliks-Client-{v}-arm64.dmg')],
        },
        {
          id: 'linux',
          doc: `${DOCS}/clients/desktop`,
          links: [
            file('.deb', 'Fliks-Client-{v}-amd64.deb'),
            file('AppImage', 'Fliks-Client-{v}-x86_64.AppImage'),
          ],
        },
      ],
    },
    {
      id: 'mobile',
      icon: LucideSmartphone,
      platforms: [
        { id: 'ios', doc: `${DOCS}/clients/mobile`, links: [store('App Store', APP_STORE)] },
        {
          id: 'android',
          doc: `${DOCS}/clients/mobile`,
          links: [store('Google Play', GOOGLE_PLAY), file('.apk', 'Fliks-{v}.apk')],
        },
      ],
    },
    {
      id: 'tv',
      icon: LucideTv,
      platforms: [
        { id: 'appletv', doc: `${DOCS}/clients/apple-tv`, links: [store('App Store', APP_STORE)] },
        {
          id: 'androidtv',
          doc: `${DOCS}/clients/android-tv`,
          links: [store('Google Play', GOOGLE_PLAY)],
        },
        { id: 'lg', doc: `${DOCS}/clients/lg-webos`, links: [store('LG Content Store', LG_STORE)] },
        {
          id: 'samsung',
          doc: `${DOCS}/clients/samsung-tizen`,
          links: [file('.wgt', 'Fliks-{v}.wgt')],
        },
      ],
    },
    {
      id: 'other',
      icon: LucideGlobe,
      platforms: [
        { id: 'web', doc: `${DOCS}/clients/web`, links: [] },
        { id: 'chromecast', doc: `${DOCS}/clients/chromecast`, links: [] },
        {
          id: 'switch',
          doc: 'https://github.com/fliks-app/switchfliks',
          links: [store('GitHub', 'https://github.com/fliks-app/switchfliks')],
        },
      ],
    },
  ];
}
