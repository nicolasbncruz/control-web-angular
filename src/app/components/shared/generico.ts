import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ViewChild} from '@angular/core';
import {Constante} from '../../constantes/constante';

export class Generico {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  resultsLength = 0;
  maxResult = 5;
  limitesPaginado: any = [];
  paginaIndex = 0;
  isLoadingResults: boolean = false;
  paginaActual: number = 0;
  campoSort: string = Constante.CAMPO_SORT_DEFECTO;
  tipoSort: string = Constante.TIPO_SORT_DEFECTO;
  tipoSortEstacion: string = Constante.ORDEN_ASCENDENTE;
  constructor() {
  }

  ngSetValoresCabeceraColumnas(valores) {
    if (this.dataSource) {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0, this.paginator.pageSize = this.maxResult);
    }
    this.displayedColumns = valores;
  }

  ngSetPaginacion(valor){
    if(valor <= 5 ){
      this.paginator.pageSize = 5;
      return;
    } else if(valor <= 10){
      if(this.paginator.pageSize == 20){
        this.paginator.pageSize = 5;
      }
    }
  }

  ngSetValoresCabeceraColumnasSinPaginado(valores) {
    this.displayedColumns = valores;
  }

  ngSort(event) {
    this.campoSort = event.active;
    this.tipoSort = event.direction;
    this.tipoSortEstacion = event.direction;
  }

  ngValidarCantidad(reusable, dialog, snackbar, response) {
    this.ngLimpiarTabla(reusable);
    if (response.codigoOperacion != Constante.CODIGO_HTTP_OK) {
      this.ngSetPaginacion(0);
      reusable.ngProcesarMensaje(dialog, response.mensaje, snackbar, null, null, response.codigoOperacion, Constante.FALSE);
      throw(response.mensaje);
    }
  }

  ngLimpiarTabla(reusable) {
    this.dataSource.data = [];
    this.resultsLength = Constante.CERO_ENTERO;
    this.limitesPaginado = reusable.getLimitesPaginado(Constante.CERO_ENTERO);
  }

}
