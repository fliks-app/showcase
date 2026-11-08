import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { setPageTitle } from '../../core/page-title';
import { setSeo } from '../../core/seo';

@Component({
  selector: 'app-credits',
  imports: [TranslatePipe],
  templateUrl: './credits.html',
})
export class Credits {
  protected readonly providers = [
    { id: 'tmdb', name: 'TMDB', url: 'https://www.themoviedb.org' },
    { id: 'tvdb', name: 'TheTVDB', url: 'https://thetvdb.com' },
    { id: 'musicbrainz', name: 'MusicBrainz', url: 'https://musicbrainz.org' },
    { id: 'caa', name: 'Cover Art Archive', url: 'https://coverartarchive.org' },
    { id: 'listenbrainz', name: 'ListenBrainz', url: 'https://listenbrainz.org' },
    { id: 'fanart', name: 'Fanart.tv', url: 'https://fanart.tv' },
    { id: 'lrclib', name: 'LRCLIB', url: 'https://lrclib.net' },
    { id: 'openlibrary', name: 'Open Library', url: 'https://openlibrary.org' },
    { id: 'bnf', name: 'BnF', url: 'https://catalogue.bnf.fr' },
    { id: 'googlebooks', name: 'Google Books', url: 'https://books.google.com' },
    { id: 'audible', name: 'Audible', url: 'https://www.audible.com' },
    { id: 'audnexus', name: 'Audnexus', url: 'https://audnex.us' },
    { id: 'thexem', name: 'TheXEM', url: 'https://thexem.info' },
  ] as const;

  constructor() {
    setPageTitle('credits.metaTitle');
    setSeo({ path: 'credits', titleKey: 'credits.metaTitle', descriptionKey: 'credits.metaDescription' });
  }
}
