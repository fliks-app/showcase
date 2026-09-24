import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import { appTranslateLoader, DEFAULT_LANG } from './core/translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideClientHydration(),
    provideTranslateService({
      // A `useValue` provider object, not a bare class: a `useClass` loader here breaks
      // under production minification during static prerendering (esbuild + Angular DI).
      loader: { provide: TranslateLoader, useValue: appTranslateLoader },
      fallbackLang: DEFAULT_LANG,
      lang: DEFAULT_LANG,
    }),
  ],
};
