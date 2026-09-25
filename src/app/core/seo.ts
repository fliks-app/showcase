import { effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

const SITE_URL = 'https://fliks.media/';
const OG_IMAGE = { url: `${SITE_URL}img/og-image.jpg`, width: 1200, height: 630 };

export interface SeoPage {
  /** Route path segment, no leading/trailing slash; '' for the home page. */
  path: string;
  titleKey: string;
  descriptionKey: string;
  jsonLd?: Record<string, unknown>;
}

function upsertCanonical(doc: Document, href: string): void {
  let link = doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    doc.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(doc: Document, data: Record<string, unknown>): void {
  let script = doc.getElementById('seo-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'seo-jsonld';
    doc.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/** Canonical link, Open Graph, Twitter card and JSON-LD for a page. Call from a component constructor. */
export function setSeo(page: SeoPage): void {
  const meta = inject(Meta);
  const translate = inject(TranslateService);
  const doc = inject(DOCUMENT);
  const url = page.path ? `${SITE_URL}${page.path}/` : SITE_URL;

  effect(() => {
    const title = translate.instant(page.titleKey);
    const description = translate.instant(page.descriptionKey);
    const imageAlt = translate.instant('hero.imageAlt');

    meta.updateTag({ name: 'description', content: description });
    upsertCanonical(doc, url);

    meta.updateTag({ property: 'og:type', content: 'website' });
    meta.updateTag({ property: 'og:site_name', content: 'Fliks' });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:url', content: url });
    meta.updateTag({ property: 'og:image', content: OG_IMAGE.url });
    meta.updateTag({ property: 'og:image:width', content: String(OG_IMAGE.width) });
    meta.updateTag({ property: 'og:image:height', content: String(OG_IMAGE.height) });
    meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    meta.updateTag({ property: 'og:locale', content: 'en_US' });
    meta.updateTag({ property: 'og:locale:alternate', content: 'fr_FR' });

    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:title', content: title });
    meta.updateTag({ name: 'twitter:description', content: description });
    meta.updateTag({ name: 'twitter:image', content: OG_IMAGE.url });
    meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    if (page.jsonLd) {
      upsertJsonLd(doc, page.jsonLd);
    }
  });
}
