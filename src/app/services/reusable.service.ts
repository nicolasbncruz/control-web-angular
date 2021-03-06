import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Constante} from '../constantes/constante';
import {Observable} from 'rxjs/Observable';
import {ConfirmacionDialogComponent} from '../components/shared/confirmacion-dialog/confirmacion-dialog.component';
import {ConfirmacionAlertComponent} from '../components/shared/confirmacion-alert/confirmacion-alert.component';
import {ErrorDialogComponent} from '../components/shared/error-dialog/error-dialog.component';
import {EncriptarContraseniaRequest} from '../constantes/catalogo';
// import {SesionService} from './sesion.service';

export const InterceptorSkipHeaderRefresh = 'X-Skip-Interceptor';

@Injectable()
export class ReusableService {

  constructor(private http: HttpClient) {
  }

  /*getDecimalsNumber() {
    return this.sesionService.getSesionParametros().find(elemento => elemento.code == Constante.DECIMAL_PARAMETER_CODE)['value'];
  }

  getPreOrder() {
    return this.sesionService.getSesionParametros().find(elemento => elemento.code == Constante.PREORDER_PARAMETER_CODE)['value'];
  }*/

  getToday() {
    let date = new Date();
    date.setHours(12, 0, 0);
    return date;
  }

  getAfterDayToday() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0);
    return date;
  }

  getSinceDayToday(){
    let date = new Date();
    date.setDate(date.getDate());
    //date.setHours(0,0,0);
    return date;
  }

  getFormatDateTimeToString(paramDate: Date) {
    let date = paramDate.toISOString().replace(/T/, ' ').substr(0, 10);
    let time = paramDate.toLocaleTimeString();
    return `${date} ${time}`;
  }

  getOnlyDateFromDateTime(datetime: string) {
    return datetime.substr(0, 10);
  }

  getOnlyTimeFromDateTime(datetime: string) {
    return datetime.substr(11, datetime.length);
  }

  getFormatDateToString(paramDate: Date) {
    let date = paramDate.toISOString().replace(/T/, ' ').substr(0, 10);
    return date;
  }

  actualizarFechaInicio(event) {
    let diaHoy = new Date();
    let fechaInicio;
    let diaInicioSeleccionadoMas30Dias = new Date(event.getTime() + (24 * 60 * 60 * 1000) * 30);
    diaHoy.setHours(0, 0, 0);
    diaHoy.setMilliseconds(0);
    if (diaInicioSeleccionadoMas30Dias.getTime() > diaHoy.getTime()) {
      fechaInicio = {
        min: event,
        max: new Date(diaHoy.getTime())
      };
      return fechaInicio;
    } else {
      fechaInicio = {
        min: event,
        max: new Date(diaHoy.getTime())
      };
      return fechaInicio;
    }
  }

  actualizarFechaFin(event) {
    let fechaFin = {
      min: this.fechaMinDefecto(),
      max: event
    };
    return fechaFin;
  }

  fechaFinMax() {
    return new Date(this.fechaMinDefecto().getTime() + (24 * 60 * 60 * 1000) * 30);
  }

  fechaMinDefecto() {
    return new Date(this.getToday().getTime() - (24 * 60 * 60 * 1000) * 30);
  }

  obtenerDiferenciaDias(fechaInicio: Date, fechaFin: Date) {
    var unDia = 1000 * 60 * 60 * 24;
    var fechaDia1 = fechaInicio.getTime();
    var fechaDia2 = fechaFin.getTime();
    var cantidadDias = Math.abs(fechaDia2 - fechaDia1);
    return Math.round(cantidadDias / unDia);
  }

  getCatch(error) {
    return Observable.throw('Server error:' + error);
  }

  getLimitesPaginado(cantidad: number): any {
    let pageSizeOptions = [5, 10, 20];
    let array = [];
    switch (true) {
      case (cantidad <= 5) :
        array = pageSizeOptions.slice(0, 1);
        break;
      case cantidad <= 10 :
        array = pageSizeOptions.slice(0, 2);
        break;
      case cantidad > 10 :
        array = pageSizeOptions;
      default :
    }
    return array;
  }

  ngProcesarMensajesError(cadenaMensajes) {
    let arrayMensajes = [];
    for (let mensaje of cadenaMensajes.split('&')) {
      if (mensaje != null && mensaje != '') {
        arrayMensajes.push(mensaje);
      }
    }
    return arrayMensajes;
  }

  ngProcesarMensaje(dialog: MatDialog, mensaje: string, snackBar: MatSnackBar, urlRedireccion: string, router: Router, codigoOperacion, seMuestra?) {
    if (codigoOperacion == Constante.CODIGO_HTTP_OK && seMuestra == undefined) {
      this.ngMostrarMensajeExito(mensaje.replace(/&/g, ' '), snackBar, urlRedireccion, router);
    } else if (codigoOperacion != Constante.CODIGO_HTTP_OK) {
      this.ngMostrarMensajeError(dialog, mensaje);
    }
  }

  ngDiaglogRef(nombrePopup, accion, dialog, adicional?) {
    return dialog.open(ConfirmacionDialogComponent, {
      width: '310px', data: {nombrePopup: nombrePopup, accion: accion, adicional: adicional}
    });
  }

  ngDiaglogRefAlerta(nombrePopup, accion, dialog, adicional?) {
    return dialog.open(ConfirmacionAlertComponent, {
      width: '310px', data: {nombrePopup: nombrePopup, accion: accion, adicional: adicional}
    });
  }

  ngMostrarMensajeError(dialog: MatDialog, mensaje: string) {
    let arrayErrores = this.ngProcesarMensajesError(mensaje);
    let titulo = '';

    if (mensaje.indexOf('Ocurrió un error') > Constante.NO_ENCONTRADO) {
      titulo = Constante.MENSAJE_ERROR;
    } else {
      titulo = Constante.MENSAJE_ATENCION;
    }

    dialog.open(ErrorDialogComponent, {
      data: {data: arrayErrores, titulo: titulo}
    });
  }

  ngMostrarMensajeExito(mensaje: string, snackBar: MatSnackBar, urlRedireccion: string, router: Router) {
    snackBar.open(
      mensaje,
      '',
      {verticalPosition: 'bottom', duration: 2000, panelClass: 'position-box'}
    );

    if (urlRedireccion != null && urlRedireccion != '') {
      router.navigate([urlRedireccion]);
    }
  }

  ngProcesarDescargaReporte(data, nombreReporte, extension?) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = (extension == undefined ? nombreReporte : nombreReporte + '.' + extension);
    link.click();
  }

  ngLimpiarListasDesplegables() {
    let listaVacia: any[] = [];
    return listaVacia;
  }

  ngObtenerEncriptarContraseniaRequest(contrasenia) {
    let encriptarContraseniaRequest: EncriptarContraseniaRequest = new EncriptarContraseniaRequest();
    encriptarContraseniaRequest.contrasenia = contrasenia;
    return encriptarContraseniaRequest;
  }

  // ngEsAdministradorAplicacion() {
  //   return this.sesionService.getSesionUsuario().esAdministradorAplicacion == Constante.ES_ADMIN_APP;
  // }

  ngValidarSimboloMoneda(monedaParametro) {
    for (let moneda of Constante.getMonedas) {
      if (moneda.descripcion == monedaParametro) {
        return moneda.simbolo;
      }
    }
  }

  ngLeerConfiguracion() {
    return this.http.get('assets/configuracion.json');
  }

  ngEncodeBase64(data) {
    return {'params': btoa(JSON.stringify(data))};
  }

  ngDecodeBase64(params) {
    return JSON.parse(atob(params[Constante.NOMBRE_PARAMETRO_GLOBAL]));
  }

  ngObtenerAccionPopup(esActualizar: boolean) {
    return esActualizar ? 'actualizar' : 'registrar';
  }

  ngValidarOrigenMobil() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      return true;
    }
  }

}
