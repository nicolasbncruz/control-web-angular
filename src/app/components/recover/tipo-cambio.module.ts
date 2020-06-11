import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TipoCambioComponent} from './tipo-cambio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {HighlightJsModule} from 'angular2-highlight-js';
import {NgxJsonViewerModule} from 'ngx-json-viewer';

const routes: Routes = [
  { path: '', component: TipoCambioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    // Inicio - módulos que necesita el componente para iniciar
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // Material
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HighlightJsModule,
    NgxJsonViewerModule,
    // Fin - módulos que necesita el componente para iniciar
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TipoCambioComponent],
  exports: [RouterModule]
})
export class TipoCambioModule { }
