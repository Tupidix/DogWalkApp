import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { onlyAuthenticated } from './security/only-authenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./security/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    // Go to the register.page
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    component: TabsPage,
    canActivate: [onlyAuthenticated],
    children: [
      {
        path: 'maps',
        loadComponent: () => import('./maps/maps.page').then((m) => m.MapsPage),
        children: [
          {
            path: 'walkers',
            // Go to the map.page
            loadComponent: () =>
              import('./maps/walkers/walkers.page').then((m) => m.WalkersPage),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './maps/walkers/walkerslist/walkerslist.component'
                  ).then((m) => m.WalkerslistComponent),
              },
              {
                path: ':walkerId',
                loadComponent: () =>
                  import(
                    './maps/walkers/walkerdetail/walkerdetail.component'
                  ).then((m) => m.WalkerdetailComponent),
              },
            ],
          },
          {
            path: 'walks', // Servira de base pour afficher la carte
            // Go to the walks.page qui aura la carte en haut avec différentes walks
            loadComponent: () =>
              import('./maps/walks/walks.page').then((m) => m.WalksPage),
            children: [
              {
                // Walks servira àa afficher la liste des walks au dessous de la carte présente dans le niveau au-dessus
                path: '',
                loadComponent: () =>
                  import('./maps/walks/walkslist/walkslist.component').then(
                    (m) => m.WalkslistComponent
                  ),
              },
              {
                // Servira à afficher le détail d'un walk au dessous de la carte présente dans le niveau au-dessus
                path: ':walkId',
                loadComponent: () =>
                  import('./maps/walks/walkdetails/walkdetails.component').then(
                    (m) => m.WalkdetailsComponent
                  ),
              },
            ],
          },
          {
            path: '',
            redirectTo: 'walkers',
            pathMatch: 'full',
          },
        ],
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
      {
        path: '',
        redirectTo: '/maps',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'dogs',
    loadComponent: () => import('./dogs/dogs.page').then((m) => m.DogsPage),
  },
];
