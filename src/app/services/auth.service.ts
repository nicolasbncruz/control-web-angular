import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Constante} from '../constantes/constante';

@Injectable()
export class AuthService {
  urlBase:string = environment.path;

  constructor(public router: Router,
              private http:HttpClient) {}

}
