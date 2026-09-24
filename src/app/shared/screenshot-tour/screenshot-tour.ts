import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TourItem {
  image: string;
  labelKey: string;
  altKey: string;
}

@Component({
  selector: 'app-screenshot-tour',
  imports: [TranslatePipe],
  templateUrl: './screenshot-tour.html',
})
export class ScreenshotTour {
  readonly items = input.required<TourItem[]>();
  protected readonly active = signal(0);
  /** Stays opaque under the incoming image so the crossfade never shows the empty frame. */
  protected readonly previous = signal(-1);

  select(i: number): void {
    if (i === this.active()) return;
    this.previous.set(this.active());
    this.active.set(i);
  }
}
