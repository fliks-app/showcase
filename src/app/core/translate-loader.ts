import type { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { of } from 'rxjs';
import en from '../../../public/i18n/en.json';
import fr from '../../../public/i18n/fr.json';

export const SUPPORTED_LANGS = ['en', 'fr'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = 'en';

const TRANSLATIONS: Record<SupportedLang, TranslationObject> = {
  en: en as TranslationObject,
  fr: fr as TranslationObject,
};

/**
 * Translations are bundled at build time instead of fetched over HTTP: the
 * same loader then works unchanged in the browser and during SSG prerender,
 * where there is no server to answer a relative request. A plain object
 * (not a class) so the DI provider is a `useValue`, never constructed.
 */
export const appTranslateLoader: TranslateLoader = {
  getTranslation: (lang: string) => of(TRANSLATIONS[lang as SupportedLang] ?? TRANSLATIONS[DEFAULT_LANG]),
};
