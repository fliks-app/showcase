import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features').then((m) => m.Features),
  },
  {
    path: 'download',
    loadComponent: () => import('./pages/download/download').then((m) => m.Download),
  },
];

