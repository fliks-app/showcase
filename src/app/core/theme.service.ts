import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fliks-theme';

/**
 * The initial value is resolved by an inline script in index.html (runs
 * before first paint, no flash). This service only mirrors and toggles it.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.currentAttribute());

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.document.documentElement.setAttribute('data-theme', next);
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this load.
      }
    }
  }

  private currentAttribute(): Theme {
    const value = this.document.documentElement.getAttribute('data-theme');
    return value === 'light' ? 'light' : 'dark';
  }
}
