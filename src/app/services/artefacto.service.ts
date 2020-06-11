import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CertificadoRegistroDTO, RegistrarCertificadoRequest, RegistrarVersionRequest, VersionRegistroDTO} from '../constantes/catalogo';
import {FormGroup} from '@angular/forms';
import {Constante} from '../constantes/constante';
import {ReusableService} from './reusable.service';
import {environment} from '../../environments/environment';

@Injectable()
export class ArtefactoService {
  urlBase: string = environment.path;

  constructor(private reusable: ReusableService,
              private http: HttpClient) {
  }
}
