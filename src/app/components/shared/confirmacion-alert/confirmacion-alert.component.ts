import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Constante} from '../../../constantes/constante';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-alert.component.html',
  styleUrls: ['./confirmacion-alert.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class ConfirmacionAlertComponent {

  opcionSi:String = Constante.OPCION_SI;

  constructor(public dialogRef: MatDialogRef<ConfirmacionAlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

}


