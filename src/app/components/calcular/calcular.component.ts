import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import 'rxjs/add/operator/takeWhile';
import {Calcular, ErrorResponse, GenericoResponse, Modulo, RequestCalcular, Serie} from '../../constantes/catalogo';
import {ReusableService} from '../../services/reusable.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Constante} from '../../constantes/constante';
import {ErroresMensajes} from '../shared/validaciones';
import {Routers} from '../../constantes/routers';
import {CalcularService} from '../../services/calcular.service';


@Component({
  selector: 'app-auth',
  templateUrl: './calcular.component.html',
  styleUrls: ['./calcular.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class CalcularComponent implements OnInit {
  formGestionarSerie: FormGroup;
  serie: Calcular = new Calcular();
  esActualizar: boolean = false;
  imei: string;
  ruc: string;
  isLoadingResults:boolean = true;
  esRegistroSerie: boolean = false;
  esRegistroCorrelativo: boolean = false;
  listaTiposMoneda:any[] = Constante.getMonedas;
  monedaOrigen: string = '1';
  monedaDestino: string = '1';
  montoConTipoCambio:number;
  requestCalcular:RequestCalcular = new RequestCalcular();

  constructor(private dialog: MatDialog,
              private reusable: ReusableService,
              private serieService: CalcularService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.ngInicializarFormulario();
  }


  ngInicializarFormulario() {
    this.formGestionarSerie = new FormGroup({
      'monto': new FormControl(Constante.CADENA_VACIA),
      'montoConTipoCambio': new FormControl(Constante.CADENA_VACIA),
      'monedaOrigen': new FormControl(Constante.CERO_CADENA),
      'monedaDestino': new FormControl(Constante.CERO_CADENA)
    });
  }


  ngLlenarFormulario() {
    this.formGestionarSerie.controls['monto'].setValue(this.serie.monto);
    this.formGestionarSerie.controls['montoConTipoCambio'].setValue(this.serie.montoConTipoCambio);
    this.formGestionarSerie.controls['monedaOrigen'].setValue(this.serie.monedaOrigen);
    this.formGestionarSerie.controls['monedaDestino'].setValue(this.serie.monedaDestino);
  }

  ngRegresar() {
    this.router.navigate([Routers.RECOVER]);
  }

  ngObtenerMonto(monto){
    this.requestCalcular.monto = monto;
    this.requestCalcular.monedaOrigen = this.monedaOrigen;
    this.requestCalcular.monedaDestino = this.monedaDestino;
    this.serieService.calcularMonto(this.requestCalcular).subscribe(
      (response: any) => {
        this.montoConTipoCambio = response.montoConTipoCambio;
        if(this.montoConTipoCambio!=null && this.montoConTipoCambio!=undefined){
          this.ngLlenarFormularioCompleto(monto, this.montoConTipoCambio);
        }
      }
    );
  }

  ngLlenarFormularioCompleto(monto, montoConTipoCambio){
    this.formGestionarSerie = new FormGroup({
      'monto': new FormControl(monto),
      'montoConTipoCambio': new FormControl(montoConTipoCambio),
      'monedaOrigen': new FormControl(this.monedaOrigen),
      'monedaDestino': new FormControl(this.monedaDestino)
    });
  }

  ngDefinirMonedaDestino(){
    this.monedaDestino = this.formGestionarSerie.controls['monedaDestino'].value;
    console.log("destino: "+this.monedaDestino);
  }

  ngDefinirMonedaOrigen(){
    this.monedaOrigen = this.formGestionarSerie.controls['monedaOrigen'].value;
    console.log("origen: "+this.monedaOrigen);
  }

}
