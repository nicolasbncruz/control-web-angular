import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Constante} from '../constantes/constante';
import {Routers} from '../constantes/routers';

@Injectable()
export class SesionService {

  constructor(private http: HttpClient,
              private dialogRef: MatDialog,
              private router: Router) {
  }

  guadarSesionGlobal(data) {
    sessionStorage.setItem(Constante.SESION_GLOBAL, JSON.stringify(data));
  }

  getSesionGlobal() {
    return JSON.parse(sessionStorage.getItem(Constante.SESION_GLOBAL));
  }

  getSesionUsuario() {
    return this.getSesionGlobal().usuario;
  }

  getSesionEmpresa() {
    return this.getSesionGlobal().empresa;
  }

  getSesionParametros() {
    return this.getSesionGlobal().parameters;
  }

  getSesionOpciones() {
    return this.getSesionGlobal().opciones;
  }

  getSesionToken() {
    return this.getSesionGlobal().tokens;
  }

  closeSession(debeRedireccionarLogin?: boolean) {
    this.eliminarSesion();
    this.dialogRef.closeAll();
    debeRedireccionarLogin == undefined || debeRedireccionarLogin ? this.router.navigate([Routers.CALCULAR]) : null;
  }

  eliminarSesion() {
    sessionStorage.removeItem(Constante.SESION_GLOBAL);
    sessionStorage.clear();
  }

  guardarSesionPuntoVenta(data) {
    sessionStorage.setItem(Constante.SESION_PUNTO_VENTA, JSON.stringify(data));
  }

  getSesionPuntoVenta() {
    return JSON.parse(sessionStorage.getItem(Constante.SESION_PUNTO_VENTA));
  }

  eliminarSesionPuntoVenta() {
    sessionStorage.removeItem(Constante.SESION_PUNTO_VENTA);
  }

}
