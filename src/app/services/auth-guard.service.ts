import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {SesionService} from './sesion.service';
import {TokenService} from './token.service';
import {Routers} from '../constantes/routers';
import {Constante} from '../constantes/constante';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth:AuthService,
              private sesionService:SesionService,
              private tokenService:TokenService,
              private router:Router) {}

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if (this.tieneUnaSesionActiva()) {
      if (!this.tienePermisoParaAccederPagina(state.url)) {
        this.router.navigate([Routers.ERRORPAGINA]);
        return false;
      }

      return true;
    } else {
      this.sesionService.closeSession();
      return false;
    }
  }

  tieneUnaSesionActiva():boolean {
    return true;
  //  return this._auth.isAuthenticated() && !this.tokenService.esTokenEspirado();
  }

  tienePermisoParaAccederPagina(urlRequest:string):boolean {
    let urlBase = this.validarUrlTieneParametro(urlRequest);

    let validacionRutaPermitida = this.sesionService.getSesionOpciones().find(elemento => elemento == urlBase);

    return validacionRutaPermitida != undefined;
  }

  validarUrlTieneParametro(urlRequest:string):String {
    if (urlRequest.indexOf(Constante.NOMBRE_PARAMETRO_GLOBAL) >= 0) {
      return urlRequest.substr(0, urlRequest.indexOf(';'));
    }

    return urlRequest;
  }

}
