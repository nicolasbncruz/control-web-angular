import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class ErrorDialogComponent implements OnInit {

  errores:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ErrorDialogComponent>) { }

  ngOnInit() {
    this.errores = this.data.data;
  }

}
