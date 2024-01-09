import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Go to the maison.page
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // Go to the maison.page
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tabs',
    // Go to the tabs.routes.ts
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
