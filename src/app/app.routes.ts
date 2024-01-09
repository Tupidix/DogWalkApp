import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    // Go to the login.page
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // Go to the login.page
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    // Go to the register.page
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    component: TabsPage, // Permet d'afficher le menu qui est dans le dossier tabs
    children: [
      {
        path: 'map',
        // Go to the map.page
        loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'profile',
        // Go to the profile.page
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'dogs',
        // Go to the dogs.page
        loadComponent: () => import('./dogs/dogs.page').then((m) => m.DogsPage),
      },
    ],
  },
];
