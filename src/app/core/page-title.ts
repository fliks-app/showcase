import { effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

/** Keeps the document title in sync with the active language. Call from a component constructor. */
export function setPageTitle(key: string): void {
  const title = inject(Title);
  const translate = inject(TranslateService);
  effect(() => title.setTitle(translate.instant(key)));
}
