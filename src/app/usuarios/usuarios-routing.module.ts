import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosLayoutComponent } from './layouts/Usuarios-Layout.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosLayoutComponent,
    children: [
      {
        path: 'registro',
        loadComponent: () =>
          import('./components/registro/registro.component').then(
            (m) => m.RegistroComponent
          ),
      },
      {
        path: 'listado',
        loadComponent: () =>
          import('./components/listado/listado.component').then(
            (m) => m.ListadoComponent
          ),
      },
      {
        path: 'editar/:dni',
        loadComponent: () =>
          import('./components/edit/edit.component').then(
            (m) => m.EditComponent
          ),
      },
      {
        path: '',
        redirectTo: 'registro',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
// {
//   path: 'registro',
//   loadComponent: () =>
//     import('./components/registro/registro.component').then(
//       (m) => m.RegistroComponent
//     ),
// },
// {
//   path: 'listado',
//   loadComponent: () =>
//     import('./components/listado/listado.component').then(
//       (m) => m.ListadoComponent
//     ),
// },
// {
//   path: 'editar/:dni',
//   loadComponent: () =>
//     import('./components/edit/edit.component').then((m) => m.EditComponent),
// },
