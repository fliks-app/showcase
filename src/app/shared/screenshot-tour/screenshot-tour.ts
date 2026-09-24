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
  /** Intrinsic height of the set's 1600px-wide images, so the frame is sized before they load. */
  readonly height = input(1000);
  /** Skips the panel border/shadow, for when a parent (e.g. a TV bezel) already frames the screen. */
  readonly frameless = input(false);
  protected readonly active = signal(0);
}
