import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InterceptorSkipHeaderRefresh} from './reusable.service';
import {JwtHelper} from 'angular2-jwt';
import {SesionService} from './sesion.service';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenService {
  //urlBase:string = environment.path_security;
  urlBase:string = environment.path;

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http:HttpClient,
              private sesionService: SesionService) {
  }

  refreshInterceptorToken() {
    let headers = new HttpHeaders();
    headers = headers.set(InterceptorSkipHeaderRefresh, "");
    //headers = headers.set('Authorization', 'Bearer ' + this.sesionService.getSesionToken().token_refresh);//ncruz
    //return this.http.post(`${this.urlBase}/refresh_token`, null, {headers: headers});
    return this.http.post(`${this.urlBase}/is-authentication/authentication/refresh_token`, null, {headers: headers});
  }

  esTokenEspirado() {
    return this.jwtHelper.isTokenExpired(this.sesionService.getSesionToken().token);
  }

}
