import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Constante} from '../../constantes/constante';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorResponse, GenericoResponse, Serie} from '../../constantes/catalogo';
import {ReusableService} from '../../services/reusable.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Routers} from '../../constantes/routers';
import {CalcularService} from '../../services/calcular.service';

@Component({
  selector: 'app-recover',
  templateUrl: './tipo-cambio.component.html',
  styleUrls: ['./tipo-cambio.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class TipoCambioComponent implements OnInit {

  formGestionarSerie: FormGroup;
  serie: Serie = new Serie();
  esActualizar: boolean = false;
  imei: string;
  ruc: string;
  isLoadingResults:boolean = true;
  dispositivoSeleccionado: string;
  esRegistroSerie: boolean = false;
  esRegistroCorrelativo: boolean = false;

  constructor(private dialog: MatDialog,
              private reusable: ReusableService,
              private serieService: CalcularService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.ngInicializarFormulario();
    this.ngObtenerSerie();
  }

  ngObtenerSerie() {
    // this.isLoadingResults = true;
    this.serieService.obtenerTipoCambio().subscribe(
      (response: any) => {
        // this.isLoadingResults = false;
        this.serie = <Serie>response;

        console.log('euros: '+JSON.stringify(response.tipoCambioEuros));
        console.log('euros: '+JSON.stringify(response));
        this.ngLlenarFormulario();
      }, (error: ErrorResponse) => {
        // this.isLoadingResults = false;
        this.reusable.ngProcesarMensaje(this.dialog, error.error.mensaje, this.snackBar, null, null, error.error.codigoOperacion);
      });
  }

  ngInicializarFormulario() {
    this.formGestionarSerie = new FormGroup({
      'id': new FormControl(Constante.CADENA_VACIA, null),
      'idDolares': new FormControl(Constante.CADENA_VACIA, null),
      'idEuros': new FormControl(Constante.CADENA_VACIA, null),
      'descripcionDolares': new FormControl(Constante.CADENA_VACIA),
      'descripcionEuros': new FormControl(Constante.CADENA_VACIA),
      'tipoCambioDolares': new FormControl(Constante.CADENA_VACIA, [Validators.required,Validators.maxLength(10)]),
      'tipoCambioEuros': new FormControl(Constante.CADENA_VACIA, [Validators.required,Validators.maxLength(10)])
    });
  }

  ngGuardarSeries() {

    let nombrePopup: string = 'tipo de cambio';
    this.reusable.ngDiaglogRef(nombrePopup, 'guardar', this.dialog).afterClosed().subscribe(result => {
      if (result == Constante.OPCION_SI) {
        this.serieService.registrarSerie(this.serieService.obtenerDatosSerie(this.formGestionarSerie)).subscribe(
          (response: GenericoResponse) => {
            // this.router.navigate([Routers.CALCULAR]);
            this.reusable.ngProcesarMensaje(this.dialog, response.mensaje, this.snackBar, null, this.router, response.codigoOperacion);
          });
      }
    });
  }

  ngValidarSerie(serie) {
    let serieFinal = '';
    if (serie != undefined && serie != null && serie.toString() != '') {
      serieFinal = serie.substring(1, serie.length);
    }
    return serieFinal;
  }

  ngLlenarFormulario() {
    this.formGestionarSerie.controls['id'].setValue('1');
    this.formGestionarSerie.controls['idDolares'].setValue(this.serie.idDolares);
    this.formGestionarSerie.controls['idEuros'].setValue(this.serie.idEuros);
    this.formGestionarSerie.controls['descripcionDolares'].setValue('dólares');
    this.formGestionarSerie.controls['descripcionEuros'].setValue('euros');
    this.formGestionarSerie.controls['tipoCambioDolares'].setValue(this.serie.tipoCambioDolares);
    this.formGestionarSerie.controls['tipoCambioEuros'].setValue(this.serie.tipoCambioEuros);
  }

  ngRegresar() {
    this.router.navigate([Routers.CALCULAR]);
  }

}
