import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';

@Component({
  selector: 'app-download',
  imports: [TranslatePipe],
  templateUrl: './download.html',
})
export class Download {
  constructor() {
    setPageTitle('download.metaTitle');
    setSeo({ path: 'download', titleKey: 'download.metaTitle', descriptionKey: 'download.metaDescription' });
  }
}
