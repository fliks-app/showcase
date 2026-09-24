import { Component, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { SUPPORTED_LANGS, SupportedLang } from './core/translate-loader';

@Component({
  imports: [RouterOutlet, Navbar, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const translate = inject(TranslateService);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    // The static build always prerenders English; pick up a stored choice or the
    // browser's language only once running client-side, after first paint.
    afterNextRender(() => {
      if (!isBrowser) {
        return;
      }
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('fliks-lang');
      } catch {
        // Storage can be unavailable (private mode).
      }
      const browserLang = TranslateService.getBrowserLang();
      const detected = stored ?? browserLang;
      if (detected && (SUPPORTED_LANGS as readonly string[]).includes(detected)) {
        translate.use(detected as SupportedLang);
      }
    });
  }
}
