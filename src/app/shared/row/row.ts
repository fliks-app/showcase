import { Component, ElementRef, input, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** A horizontally scrolling, snap-aligned row of cards with desktop prev/next buttons. */
@Component({
  selector: 'app-row',
  imports: [TranslatePipe],
  templateUrl: './row.html',
})
export class Row {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();

  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');

  scrollBy(direction: 1 | -1): void {
    const el = this.scroller().nativeElement;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  }
}
