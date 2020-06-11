import {FormControl} from '@angular/forms';
import {Constante} from '../../constantes/constante';

const NUMERICO = '^[0-9]+$';
const NUMERO_VERSION = '^(?:[1-9]\\d?|100).([0-9]|[1-9][0-9]|[1][0][0]).([0-9]|[1-9][0-9]|[1][0][0]).([0-9]|[1-9][0-9]|[1][0][0])$';

const ALFANUMERICO = '^[a-zA-Z0-9]*$';
const DECIMAL10_2: string = '^([0-9]{1,10})(.[0-9]{1,2})?$';
const DECIMAL2_2: string = '^([0-9]{1,2}).([0-9]{1,2})?$';
const mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

export class Validaciones {
  public static ES_NUMERO(control: FormControl): { [s: string]: boolean } {
    let numero = false;
    if (control.value != '') {
      numero = isNaN(control.value) ? true : false;
    }
    return numero ? {validacionNumero: true} : null;
  }

  public static NUMERO_CERO(control: FormControl): { [s: string]: boolean } {
    let numero = false;
    if (control.value != '') {
      numero = control.value == 0 ? true : false;
    }
    return numero ? {validacionNumeroCero: true} : null;
  }

  public static RUC_VALIDO(control: FormControl): { [s: string]: boolean } {
    if(control.value == null || control.value=="") return null;

    if (!control && !control.value) return null;

    // Validacion 11 digitos
    if (String(control.value).length != 11) return {v_11Digitos: true};

    // Ruc no Valido
    if (Validaciones.inicioNumeroRUC(control.value) || !Validaciones.validacionRUC(control.value)) return {v_rucNoValido: true};

    return null;
  }

  //#region reusables
  static inicioNumeroRUC(ruc) {
    if (!((ruc >= 1e10 && ruc < 11e9) || (ruc >= 15e9 && ruc < 18e9) || (ruc >= 2e10 && ruc < 21e9))) {
      return true;
    }
    return false;
  }

  static validacionRUC(valor) {
    valor = String(valor).trim();
    if (this.esnumero(valor)) {
      if (valor.length == 11) {
        let suma = 0;
        let x = 6;
        let zero = 0;
        for (let i = 0; i < valor.length - 1; i++) {
          if (i == 4) x = 8;
          let digito = valor.charAt(i) - zero;
          x--;
          if (i == 0) suma += digito * x;
          else suma += digito * x;
        }
        let resto = suma % 11;
        resto = 11 - resto;

        if (resto >= 10) resto = resto - 10;
        if (resto == valor.charAt(valor.length - 1) - zero) {
          return true;
        }
      }
    }
    return false;
  }

  static esnumero(campo) {
    return !isNaN(campo);
  }

  public static VALIDAR_CAMPO(contenido) {
    let resultado:string = contenido;

    if (contenido == undefined || contenido == null || contenido == Constante.OPCION_TODOS || contenido == '') {
      resultado = '';
    }

    return resultado;
  }

}

export class ErroresMensajes {

  public static ERRORMESSAGENUMERODOCUMENTO(error, tipoDocumento?) {
    const DNI = '1';
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El número de documento es requerido');
    if (error.pattern && error.pattern.requiredPattern == NUMERICO) return (response = 'El número de documento debe ser en formato numérico');
    if (tipoDocumento && tipoDocumento == DNI) {
      if (error.pattern && error.pattern.requiredPattern == NUMERICO) return (response = 'El DNI debe ser en formato numérico');
      if (error.maxlength) return (response = `El número de documento debe ser de ${error.maxlength.requiredLength} dígitos`);
      if (error.minlength) return (response = `El número de documento debe ser de ${error.minlength.requiredLength} dígitos`);
    }
    if (error.maxlength) return (response = `El número de documento debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    return response;
  }

  public static ERRORMESSAGENUMERODOCUMENTO_LOGIN(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El RUC es requerido');
    if (error.pattern && error.pattern.requiredPattern == NUMERICO) return (response = 'El Ruc debe ser en formato numérico');
    if (error.maxlength) return (response = `El Ruc debe ser de ${error.maxlength.requiredLength} dígitos`);
    if (error.minlength) return (response = `El Ruc debe ser de ${error.minlength.requiredLength} dígitos`);
    return response;
  }

  public static ERRORMESSAGEPASSWORD_LOGIN(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La contraseña es requerida');
    return response;
  }

  public static ERRORMESSAGEPORCENTAJEISC(error){
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El porcentaje ISC es requerido');
    if (error.pattern && error.pattern.requiredPattern == DECIMAL2_2) return (response = 'Formato incorrecto para porcentaje ISC');
  }
  public static ERRORMESSAGEMONTOISC(error){
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El monto ISC es requerido');
    if (error.pattern && error.pattern.requiredPattern == DECIMAL10_2) return (response = 'Formato incorrecto para el monto ISC');
  }

  public static ERRORMESSAGECORREO(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El correo es requerido');
    if (error.email) return (response = 'Error en el formato');
    return response;
  }

  public static ERRORMESSAGECORREOEMPRESA(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.pattern && error.pattern.requiredPattern == emailPattern) return (response = 'Error en el formato');
    return response;
  }

  public static ERRORMESSAGEDOMICILIOFISCAL(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El domicilio fiscal es requerido');
    if (error.maxlength) return (response = `El domicilio fiscal debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    return response;
  }

  public static ERRORMESSAGETELEFONO(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El teléfono es requerido');
    if (error.maxlength) return (response = `El teléfono debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    if (error.pattern) return (response = `Error de formato en el campo teléfono`);
    return response;
  }

  public static ERRORMESSAGEWEB(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.pattern) return (response = `Error de formato en el campo WEB`);
    return response;
  }
  public static ERRORMESSAGEPOSITION(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    // if (error.required) return (response = 'El campo posición es requerido');
    if (error.maxlength) return (response = `El campo posición debe tener como máximo ${error.maxlength.requiredLength} caracteres`);

    return response;
  }

  public static ERRORMESSAGECODESTASUNAT(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El código de establecimiento sunat es requerido');
    if (error.maxlength) return (response = `El código de establecimiento sunat debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    if (error.minlength) return (response = `El código de establecimiento sunat debe tener como máximo ${error.minlength.requiredLength} caracteres`);
    if (error.validacionNumero) return (response = 'El código debe contener solo digitos');

    return response;
  }

  public static ERRORMESSAGENRORESOLUCIONEMISOR(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El número de resolución emisor es requerido');
    if (error.maxlength) return (response = `El número de resolución emisor debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    if (error.pattern) return (response = 'El numero de resolución emisor no debe contener letras ni carácteres especiales');
    return response;
  }

  public static ERRORMESSAGENROCUENTADETRACCION(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El número de cuenta detracción es requerido');
    if (error.maxlength) return (response = `El número de cuenta detracción debe tener como máximo ${error.maxlength.requiredLength} caracteres`);
    if(error.pattern) return (response = `Error de formato en el número de cuenta detracción`);
    return response;
  }

  public static ERRORMESSAGERUC(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El número de RUC es requerido');
    if (error.v_11Digitos) return (response = 'El número de RUC debe ser 11 dígitos');
    if (error.v_rucNoValido) return (response = 'El número de RUC no es valido');
    return response;
  }

  public static ERRORMESSAGEVERSION(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El número de versión es requerido');
    if (error.pattern && error.pattern.requiredPattern == NUMERO_VERSION) return (response = 'Formato incorrecto de versión');
    return response;
  }

  public static ERRORMESSAGEGENERICOEL(error, label){
    let response = '';
    if(error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El '+ label +' es requerido');
    if (error.pattern) return (response = 'El '+ label +' no debe contener carácteres especiales.');
    if (error.maxlength) return (response = `El ` + label + ` no debe exceder los ${error.maxlength.requiredLength} carácteres`);
    if (error.minlength) return (response = `El ` + label + ` no debe contener menos de ${error.minlength.requiredLength} carácteres`);
    return response;
  }

  public static ERRORMESSAGEDESCRIPCION(error) {
    let response = '';
    if (error.required) return (response = 'La descripción es requerida');
    return response;
  }

  public static ERRORMESSAGEGENERICOLA(error, label){
    let response = '';
    if(error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La ' + label + ' es requerida');
    if (error.pattern) return (response = 'La ' + label + ' no debe contener carácteres especiales.');
    if (error.maxlength) return (response = `La `+ label +` no debe exceder los ${error.maxlength.requiredLength} carácteres`);
    return response;
  }

  public static ERRORMESSAGEHORA(error, label){
    let response = '';
    if(error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La ' + label + ' es requerida');
    if (error.pattern) return (response = 'La ' + label + ' máxima es 23:59');
    if (error.maxlength) return (response = `La `+ label +` no debe exceder los ${error.maxlength.requiredLength} carácteres`);
    return response;
  }

  public static ERRORMESSAGEPUNTOFISICO(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El punto Fisico es requerido');
    if (error.min) return (response = `El punto físico no debe ser 0`);
    if (error.max) return (response = `El punto físico no debe ser mayor a ${error.max.max}`);
    return response;
  }

  public static ERRORMESSAGECLASE(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La clase del item es requerido');
    return response;
  }

  public static ERRORMESSAGEFAMILIA(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La familia del item es requerido');
    return response;
  }

  public static ERRORMESSAGECATEGORIA(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La categoría del item es requerido');
    if (error.pattern) return (response = 'Seleccione una categoría correcta');
    return response;
  }

  public static ERROR_MESSAGE_REUSABLE_CON_ARTICULO_EL(error, nombreCampo) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = `El ${nombreCampo} es requerido`);
    return response;
  }

  public static ERROR_MESSAGE_REUSABLE_CON_ARTICULO_LA(error, nombreCampo) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = `La ${nombreCampo} es requerida`);
    return response;
  }

  public static ERRORMESSAGECODIGO(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'El código es requerido');
    return response;
  }

  public static ERRORMESSAGEFECHACADUCIDAD(error) {
    let response = '';
    if (error == undefined || error == null || error == '') return response;
    if (error.required) return (response = 'La fecha de caducidad es requerido');
    return response;
  }

}
