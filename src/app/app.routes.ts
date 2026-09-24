import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'download',
    loadComponent: () => import('./pages/download/download').then((m) => m.Download),
  },
];

