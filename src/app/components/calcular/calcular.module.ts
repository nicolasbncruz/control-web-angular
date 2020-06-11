import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CalcularComponent} from './calcular.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HighlightJsModule} from 'angular2-highlight-js';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CalcularComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    // Inicio - módulos que necesita el componente para iniciar
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    // Material
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HighlightJsModule,
    NgxJsonViewerModule,
    SharedModule,
    // Fin - módulos que necesita el componente para iniciar
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CalcularComponent],
  exports: [RouterModule]
})
export class CalcularModule {
}
