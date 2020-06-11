import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Constante} from '../../../constantes/constante';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class ConfirmacionDialogComponent {

  opcionNo:String = Constante.OPCION_NO;
  opcionSi:String = Constante.OPCION_SI;

  constructor(public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngObtenerArticulo() {
    return this.ngValidarPalabras(this.data.nombrePopup, this.data.accion);
  }

  ngValidarPalabras(palabraAnteponeArticulo, palabraAccion) {
    if (palabraAnteponeArticulo == undefined || palabraAnteponeArticulo == Constante.CADENA_VACIA) {
      return Constante.CADENA_VACIA;
    }

    if (palabraAccion.indexOf('salir') > -1) {
      return Constante.CADENA_VACIA;
    }

    let ultimaLetraPalabraAnteponeArticulo = palabraAnteponeArticulo.substr(-1);
    let dosPrimeraLetrasPalabraAnteponeArticulo = palabraAnteponeArticulo.substr(0, 2);
    let ultimasDosLetrasPalabraAnteponeArticulo = palabraAnteponeArticulo.substr(-2);
    let letrasUsoArticuloLa = ['a'];
    let letrasCompuestasUsoArticuloLa = ['ón'];
    let letrasCompuestasUsoArticuloLos = ['os','ms'];
    let letrasCompuestasUsoArticuloLas = ['es'];

    for (let letraReservada of letrasUsoArticuloLa) {
      if (ultimaLetraPalabraAnteponeArticulo == letraReservada || dosPrimeraLetrasPalabraAnteponeArticulo == 'se') {
        return 'la';
      }
    }

    for (let letraReservada of letrasCompuestasUsoArticuloLa) {
      if (ultimasDosLetrasPalabraAnteponeArticulo == letraReservada) {
        return 'la';
      }
    }

    for (let letraReservada of letrasCompuestasUsoArticuloLos) {
      if (ultimasDosLetrasPalabraAnteponeArticulo == letraReservada) {
        return 'los';
      }
    }

    for (let letraReservada of letrasCompuestasUsoArticuloLas) {
      if (ultimasDosLetrasPalabraAnteponeArticulo == letraReservada) {
        return 'las';
      }
    }

    return 'el';
  }

}


