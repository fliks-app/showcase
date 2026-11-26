import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-code-block',
  imports: [TranslatePipe],
  templateUrl: './code-block.html',
})
export class CodeBlock {
  readonly lines = input.required<string[]>();
  protected readonly copied = signal(false);

  copy(): void {
    navigator.clipboard
      ?.writeText(this.lines().join('\n'))
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 1500);
      })
      .catch(() => {
        // Clipboard access can be denied; the snippet is still selectable by hand.
      });
  }
}
