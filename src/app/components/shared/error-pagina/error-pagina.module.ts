import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPaginaComponent} from './error-pagina.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorPaginaComponent
  }
];

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ErrorPaginaComponent],
  exports: [RouterModule]
})
export class ErrorPaginaModule { }
