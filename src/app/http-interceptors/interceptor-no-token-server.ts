import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {AuthService} from '../services/auth.service';
import {MensajeGenericoComponent} from '../components/shared/mensaje-generico/mensaje-generico.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Constante} from '../constantes/constante';
import {switchMap} from 'rxjs/operators';
import {InterceptorSkipHeaderRefresh, ReusableService} from '../services/reusable.service';
import {SesionService} from '../services/sesion.service';
import {TokenService} from '../services/token.service';

const TOKEN_HEADER_KEY = 'Authorization';
const HEADER_ORIGEN = 'origen';
const HEADER_KEY = 'key';
const HEADER_RUC = 'ruc';

@Injectable()
export class InterceptorNoTokenServer implements HttpInterceptor {

  constructor(private reusable: ReusableService,
              private router: Router,
              private _auth:AuthService,
              public _dialog:MatDialog,
              private tokenService:TokenService,
              private sesionService:SesionService,
              private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    // Servicios fuera del login. No necesitan token
    if (this.sesionService.getSesionGlobal() == null) {
      let headers = this.agregarHeadersSinToken(req.headers);
      authReq = req.clone({headers});
      return this.returnIntercept(authReq, next);
    }

    // Servicios que necesitan token
    if (!this.tokenService.esTokenEspirado()) {
      // Token Activo
      let headers = this.agregarHeadersConToken(req.headers);
      authReq = req.clone({headers});
      return this.returnIntercept(authReq, next);
    } else {
      if (req.headers.has(InterceptorSkipHeaderRefresh)) {
        const headers = req.headers.delete(InterceptorSkipHeaderRefresh);
        authReq = req.clone({headers});
        return this.returnIntercept(authReq, next);
      } else {
        return this.tokenService.refreshInterceptorToken().pipe(
          switchMap((response:any)=>{
            this.ngActualizarInformacionSesion(response);
            let headers = this.agregarHeadersConToken(req.headers);
            authReq = req.clone({headers});
            return this.returnIntercept(authReq, next);
          }));
      }
    }
  }

  returnIntercept(req,next: HttpHandler){
    return next.handle(req)
      .do((rpta:any)=>{
        this.ngValidarGuardarSesionTokens(rpta.headers);
      })
      .catch((error, caught) => {
        switch(error.status) {
          case 401:
            this.tokenExpiredSession();
            break;
          case 403:
            this.accesoNoPermitido();
            break;
          case 409:
            return this.error409();
          default:
            if (!navigator.onLine) {
              this.reusable.ngMostrarMensajeError(this.dialog, "Por favor verifique su conexión a internet.");
              return;
            }
            this.reusable.ngMostrarMensajeError(this.dialog, "Ocurrió un error, por favor comuníquese con el proveedor.");
            break;
        }
      }) as any;
  }

  ngValidarGuardarSesionTokens(headers) {
    if(headers && headers.get(Constante.NOMBRE_ATRIBUTO_TOKEN) != null){
      let tokenObject = {
        token: headers.get(Constante.NOMBRE_ATRIBUTO_TOKEN),
        token_refresh: headers.get(Constante.NOMBRE_ATRIBUTO_TOKEN_REFRESCO)
      };
      this.sesionService.guadarSesionGlobal({tokens: tokenObject});
    }
  }

  ngActualizarInformacionSesion(response) {
    let sesionUsuario = this.sesionService.getSesionGlobal();
    sesionUsuario.tokens = {
      token: response[Constante.NOMBRE_ATRIBUTO_TOKEN],
      token_refresh: response[Constante.NOMBRE_ATRIBUTO_TOKEN_REFRESCO]
    };
    this.sesionService.guadarSesionGlobal(sesionUsuario);
  }

  agregarHeadersConToken(headers:HttpHeaders):HttpHeaders {
    headers = headers.set(HEADER_ORIGEN, Constante.getTiposAplicacion()[Constante.POSICION_WEB].valor);
    headers = headers.set(HEADER_KEY, Constante.getTiposAplicacion()[Constante.POSICION_WEB].descripcion);
    headers = headers.set(HEADER_RUC, this.sesionService.getSesionEmpresa().ruc);
    headers = headers.set(TOKEN_HEADER_KEY, `Bearer ${this.sesionService.getSesionToken().token}`);
    return headers;
  }

  agregarHeadersSinToken(headers:HttpHeaders):HttpHeaders {
    headers = headers.set(HEADER_ORIGEN, Constante.getTiposAplicacion()[Constante.POSICION_APPANDROID].valor);
    return headers;
  }

  error409() {
    if(this.sesionService.getSesionGlobal()!=null){
      this.dobleSession();
      return [];
    }else{
      return Observable.throw("Sesion no activa");
    }
  }

  dobleSession(){
    let dialogRef;
    setTimeout(() =>
        dialogRef = this._dialog.open(MensajeGenericoComponent, {
          width: '400px',
          data: { icon:"sentiment_very_dissatisfied",
          color:"#062a78",
          titulo:"Doble sesión",
          mensaje:`hola`
        }
      })
    , 0);
    this.sesionService.closeSession()
  }

  tokenExpiredSession(){
    let dialogRef;
    setTimeout(() =>
        dialogRef = this._dialog.open(MensajeGenericoComponent, {
          width: '470px',
          data: {
            color:"#062a78",
            icon: "access_time",
            titulo:"Desconectado",
            mensaje:`¡Superaste el tiempo máximo para realizar alguna acción dentro de la solución! <strong>(15 minutos)</strong>.<br>Es necesario que vuelvas a ingresar tus credenciales.`
          }
        })
      , 0);
    this.sesionService.closeSession();
  }

  accesoNoPermitido(){
    let dialogRef;
    setTimeout(() =>
        dialogRef = this._dialog.open(MensajeGenericoComponent, {
          width: '470px',
          data: {
            color:"#062a78",
            icon: "not_interested",
            titulo:"Desconectado",
            mensaje:`Es necesario que vuelvas a ingresar tus credenciales.`
          }
        })
      , 0);
    this.sesionService.closeSession();
  }

}
