import {environment} from '../../environments/environment';

export class Constante {
  public static get INACTIVIDAD(): any {
    const idle = {
      timeOutSesion: this.SESENTA_MINUTOS,
      contadorTimeOut: this.CINCO_SEGUNDOS
    };
    return idle;
  }

  public static SESENTA_MINUTOS = 3600;
  public static CINCO_SEGUNDOS = 5;

  public static ID_DOLARES = '1';
  public static ID_EUROS = '2';

  public static OPCION_NO = 'no';
  public static OPCION_SI = 'sí';

  public static MENSAJE_ERROR = 'Error';
  public static MENSAJE_ATENCION = 'Atención';

  public static OPCION_VACIO = '';
  public static OPCION_TODOS = '-1';

  public static NO_ES_OPCION_SISTEMA = 'false';

  public static CAMPO_SORT_DEFECTO = 'fechaModificacion';
  public static CAMPO_SORT_PUNTOFISICO = 'orden';

  public static TIPO_SORT_DEFECTO = 'Desc';

  public static PAGINA_DEFECTO = '0';
  public static LIMITE_100 = '100';

  public static CADENA_VACIA = '';
  public static ESPACIO_VACIO = ' ';

  public static CODIGO_HTTP_OK = '200';

  public static CODIGO_HTTP_NO_AUTORIZADO = '401';

  public static LIMITE_31_DIAS = 31;

  public static OPCION_NINGUNO = '-1';

  public static CIEN_PORCENTAJE = 100;

  public static OPCION_CONSULTAR_MANUAL = 'home/consultarManual';
  public static OPCION_DESCARGAR_INSTALADOR = 'home/descargarInstalador';

  public static PROCESO_EXITOSO = 'ok';

  public static EXISTE_VERSION_SUPERIOR = '618';

  public static HORA_MINUTO = '00:00';

  public static CERO_ENTERO = 0;
  public static CERO_CADENA = '0';
  public static CANTIDAD_CARACTERES_VERSION = 3;

  public static ORDEN_ASCENDENTE = 'asc';
  public static ORDEN_DESCENDENTE = 'desc';
  public static CAMPO_SORT_CODIGO = 'codigo';
  public static CAMPO_SORT_VERSION = 'version';

  public static CERO_REGISTROS = 0;

  public static INDICE_HORAS = 0;
  public static INDICE_MINUTOS = 1;
  public static LISTA_VACIA = 0;
  public static PRIMER_ELEMENTO = 1;
  public static NO_ENCONTRADO = -1;
  public static DATO_INCORRECTO = '604';
  public static FALSE = false;
  public static TRUE = true;

  public static SESION_GLOBAL = 'sesionGlobal';
  public static NOMBRE_ATRIBUTO_TOKEN = 'token';
  public static NOMBRE_ATRIBUTO_TOKEN_REFRESCO = 'token_refresco';

  public static POSICION_APPANDROID = 0;
  public static POSICION_WEB = 1;

  public static NOMBRE_PARAMETRO_GLOBAL = 'params';

  public static get getMonedas(): any {
    return [
      {'id': 1, 'descripcion': 'Soles', 'valor': '0'},
      {'id': 2, 'descripcion': 'Dolares', 'valor': '1'},
      {'id': 3, 'descripcion': 'Euros', 'valor': '2'}
    ];
  }


  public static getTiposAplicacion(): any {
    return [
      {'id': 1, 'descripcion': 'App', 'valor': '1'},
      {'id': 2, 'descripcion': 'Web', 'valor': '2'}
    ];
  }

  public static TIPO_COMPONENTE_VERSION = 0;
  public static TIPO_COMPONENTE_CERTIFICADO = 1;

  public static TIPO_ACTIVIDAD_CANCELACION = 0;
  public static TIPO_ACTIVIDAD_PROGRAMACION = 1;
  public static SESION_PUNTO_VENTA = 'puntoVenta';

}
