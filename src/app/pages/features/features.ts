import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';

@Component({
  selector: 'app-features',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './features.html',
})
export class Features {
  protected readonly featureGroups = ['watching', 'browsing', 'sharing', 'running'] as const;

  constructor() {
    setPageTitle('features.metaTitle');
    setSeo({ path: 'features', titleKey: 'features.metaTitle', descriptionKey: 'features.metaDescription' });
  }
}
