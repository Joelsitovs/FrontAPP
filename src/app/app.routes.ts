import { Route } from '@angular/router';
import { authGuard } from './guard/auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',

    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

    // canActivate: [guestGuard],
  },
  {
    path:'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [authGuard],
  }


//   {
    // path: 'dashboard',
    // canActivate: [authGuard],
    // loadChildren: () =>}
        // import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
];
