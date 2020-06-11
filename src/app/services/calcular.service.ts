import {Injectable} from '@angular/core';
import {Constante} from '../constantes/constante';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Serie} from '../constantes/catalogo';
import {environment} from '../../environments/environment';
// import {SesionService} from './sesion.service';

@Injectable()
export class CalcularService {
  // urlBase:string = environment.path;
  urlBase:string = 'http://localhost:8099';

  constructor(private http:HttpClient) { }

  registrarSerie(serie) {
    return this.http.post(`${this.urlBase}/tipoCambio`, serie);
  }

  obtenerDatosSerie(serie:FormGroup){
    let serieRegistro:Serie =  new Serie();

    let serieValue = serie.value;
    serieRegistro.id = serieValue.id;
    serieRegistro.idDolares = Constante.ID_DOLARES;
    serieRegistro.idEuros = Constante.ID_EUROS;
    serieRegistro.descripcionDolares = 'dólares';
    serieRegistro.descripcionEuros = 'euros';
    serieRegistro.tipoCambioDolares = serieValue.tipoCambioDolares;
    serieRegistro.tipoCambioEuros = serieValue.tipoCambioEuros;
    return serieRegistro;
  }

  obtenerSerie(imei, ruc) {
    return this.http.get(`${this.urlBase}/is-serie/serie/get/` + imei + `/` + ruc);
  }

  obtenerTipoCambio() {
    return this.http.get(`${this.urlBase}/tipoCambio/get-last`);
  }

  calcularMonto(request) {
    return this.http.post(`${this.urlBase}/tipoCambio/calcular`, request);
  }

}
