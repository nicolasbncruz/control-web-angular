import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FileUploadModule} from 'ng2-file-upload';
import {APP_ROUTING} from './app.route';
import {ErrorDialogComponent} from './components/shared/error-dialog/error-dialog.component';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {getSpanishPaginatorIntl} from './components/shared/angular-material-paginator/spanish-paginator-intl';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {MensajeGenericoComponent} from './components/shared/mensaje-generico/mensaje-generico.component';
import {AuthService} from './services/auth.service';
import {CalcularService} from './services/calcular.service';
import {AuthGuardService} from './services/auth-guard.service';
import {ReusableService} from './services/reusable.service';
import {TokenService} from './services/token.service';
import {SesionService} from './services/sesion.service';
import {HighlightJsModule, HighlightJsService} from 'angular2-highlight-js';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {FileSaverModule} from 'ngx-filesaver';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {ConfirmacionDialogComponent} from './components/shared/confirmacion-dialog/confirmacion-dialog.component';
import {ConfirmacionAlertComponent} from './components/shared/confirmacion-alert/confirmacion-alert.component';
import {ArtefactoService} from './services/artefacto.service';

export const IdTi=0;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MensajeGenericoComponent,
    ErrorDialogComponent,
    ConfirmacionDialogComponent,
    ConfirmacionAlertComponent,
  ],
  entryComponents:[
    MensajeGenericoComponent,
    ErrorDialogComponent,
    ConfirmacionDialogComponent,
    ConfirmacionAlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    // Material
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HighlightJsModule,
    NgxJsonViewerModule,
    FileUploadModule,
    FileSaverModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    AuthService,
    CalcularService,
    AuthGuardService,
    ReusableService,
    HighlightJsService,
    TokenService,
    ArtefactoService,
    SesionService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    {provide: 'IdTi', useValue: IdTi},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
