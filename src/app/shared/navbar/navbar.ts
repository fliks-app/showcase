import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';
import { SUPPORTED_LANGS, SupportedLang } from '../../core/translate-loader';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly theme = inject(ThemeService);
  protected readonly translate = inject(TranslateService);
  protected readonly langs = SUPPORTED_LANGS;

  useLang(lang: SupportedLang): void {
    this.translate.use(lang);
    try {
      localStorage.setItem('fliks-lang', lang);
    } catch {
      // Storage can be unavailable (private mode); the switch still works for this load.
    }
  }
}
