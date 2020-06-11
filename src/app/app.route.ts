import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {Routers} from './constantes/routers';
import {ErrorDialogComponent} from './components/shared/error-dialog/error-dialog.component';

const APP_ROUTES: Routes = [
  {path: '', loadChildren: () => import('./components/calcular/calcular.module').then(m => m.CalcularModule)},
  {path: Routers.CALCULAR, loadChildren: () => import('./components/calcular/calcular.module').then(m => m.CalcularModule)},
  {path: Routers.RECOVER, loadChildren: () => import('./components/recover/tipo-cambio.module').then((m => m.TipoCambioModule))},
  {
    path: Routers.HOME,
    component: HomeComponent,
    children: [
      {
        path: Routers.ERRORDIALOG,
        component: ErrorDialogComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },

  {path: '**', pathMatch: 'full', redirectTo: Routers.ERRORPAGINA}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);//,{useHash:true}
