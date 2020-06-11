export class Catalogo {
}

export class PaginacionRequest {
  ruc: string;
  pagina: string;
  limite: string;
  codigoODescripcion: string;
  estado: number;
  campoSort: string;
  tipoSort: string;
}

export class UnidadMedida {
  id: string;
  codigo: string;
  descripcion: string;
  estado: number;
}

export class Unspsc {
  codigo: string;
  codigoPadre: string;
  descripcion: string;
  estado: number;
}

export class Percepcion {
  id: string;
  codigo: string;
  descripcion: string;
  valor: string;
  estado: number;
}

export class Empresa {
  id: string;
  ruc: string;
  nombreComercial: string;
  domicilioFiscal: string;
  ubigeoDomicilioFiscal: string;
  nroCuentaDetraccion: string;
  estado: number;
  razonSocial: string;
  telefono: string;
  correoElectronico: string;
  web: string;
  posicion: string;
  codigoEstablecimientoSunat: string;
  nroResolucionEmisor: string;
  bks: File;
  fechaRegistro: string;
  fechaModificacion: string;
  bksPassword: string;
  keyPassword: string;
  keyAlias: string;
  codigoGrupoEmpresarial: string;
}

export class Item {
  codigo: string;
  sku: string;
  descripcion: string;
  categoria: Categoria;
  unidadMedida: UnidadMedida;
  unspsc: Unspsc;
  detraccion: Detraccion;
  percepcion: Percepcion;
  tipoAplicacionIsc: TipoAplicacionIsc;
  regimenIsc: RegimenIsc;
  montoIsc: number;
  porcentajeIsc: number;
  tipoItem: string;
  ruc: string;
  estado: number;
}

export class Categoria {
  id: string;
  codigo: string;
  descripcion: string;
  ruc: string;
  estado: number;
}


export class PrecioItem {
  id: string;
  codigo: string;
  valorUnitario: number;
  precioUnitario: number;
  tipoDescuento: TipoDescuento;
  valorDescuento: number;
  item: Item;
  estado: string;
}

export class TipoDocumento {
  id: string;
  codigo: string;
  descripcion: string;
  estado: number;
}

export class TipoDescuento {
  id: string;
  codigo: string;
  descripcion: string;
  estado: string;
}

export class Cliente {
  id: string;
  tipoDocumento: TipoDocumento;
  nroDocumento: string;
  ruc: string;
  razonSocial: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  ubigeo: string;
  pais: string;
  email: string;
  fechaRegistro: string;
  fechaModificacion: string;
  origen: number;
  estado: number;
}

export class ServicioFerroviario {
  id: string;
  ruc: string;
  codigo: string;
  descripcion: string;
  fechaRegistro: string;
  fechaModificacion: string;
  estado: number;
}

export class Opcion {
  id: string;
  codigo: string;
  descripcion: string;
  codigoModulo: string;
  descripcionAdicional: string;
  fechaRegistro: string;
  fechaModificacion: string;
  estado: number;
  opcionSistema: boolean;
  ruta: string;
  icono: string;
  tipoAplicacion: number;
  usuarioRegistro: string;
  usuarioModificacion: string;
}

export class Modulo {
  id: string;
  codigo: string;
  descripcion: string;
  icono: string;
  usuarioCreacion: string;
  usuarioModificacion: string;
  estado: number;
  tipoAplicacion: number;
  opcion: Opcion;
  orden: number;
}

export class Usuario {
  id: string;

  apellidoPaterno: string;
  apellidoMaterno: string;
  codigosRoles: string[];
  contrasenia: string;
  esAdministradorAplicacion: number;
  esPrimerLogin: number;
  estado: number;
  nombres: string;
  numeroDocumento: string;
  ruc: string;//ncruz
  tipoDocumento: string;
  usuario: string;//ncruz
  usuarioAuditoria: string;//ncruz

  correoElectronico: string;
  /*rucs: string[];
  codigo: string;
  nombreCompleto: string;

  usuarioCreacion: string;
  usuarioModificacion: string;
  fechaRegistro: string;
  fechaModificacion: string;*/

}

export class Ubigeo {
  codDpto: string;
  codProv: string;
  codDist: string;
  descripcion: string;
  estado: number;
}

export class GenericoResponse {
  respuesta: any;
  mensaje: string;
  codigoOperacion: string;
}

export class Detraccion {
  id: string;
  codigo: string;
  descripcion: string;
  valor: string;
  estado: number;
}

export class RegimenIsc {
  id: string;
  codigo: string;
  regimen: string;
  estado: number;
  tipoAplicacionIsc: TipoAplicacionIsc;
}

export class TipoAplicacionIsc {
  id: string;
  codigo: string;
  descripcion: string;
  estado: number;
}

export class GrupoEmpresarial {
  id: string;
  codigo: string;
  descripcion: string;
  descripcionAdicional: string;
  estado: number;
}

export class ErrorResponse {
  error: GenericoResponse;
}

export class RolOpcion {
  id: string;
  idRol: string;
  idOpcion: string;
}

export class ValidarExisteUsuarioRequest {
  email: string;
}

export class CambiarContraseniaRequest {
  email: string;
  nuevoPassword: string;
}

export class ListarVersionesEmpresaRequest extends PaginacionRequest {
  versionOdescripcion: string;
}

export class EncriptarContraseniaRequest {
  contrasenia: string;
}

export class Programacion {
  id: string;
  codigo: string;
  codigoTren: string;
  descripcion: string;
  codigoEstacion: string;
  horaLlegada: string;
  horaSalida: string;
  ruc: string;
  estado: number;
  usuarioRegistro: string;
  usuarioModificacion: string;
  orden: number;
}

export class RestablecerContadorRequest {
  ruc: string;
}


export class ListParameterWebRequest extends PaginacionRequest {
  rucEmpresa: string;
}

export class ListParameterCompanyWebRequest extends PaginacionRequest {
  applicationType: string;
}

export class ListPuntoVentaRequest {
  id: string;
}

export class Parameter {
  id: string;
  code: string;
  description: string;
  additionalDescription: string;
  dataType: string;
  domainRegex: string;
  domainText: string;
  //message:string;
  applicationType: string;
  registerDate: string;
  modificationDate: string;
  state: string;
}

export class AssignedParameter {
  id: string;
  ruc: string;
  parameterCode: string;
  value: string;
  registerDate: string;
  modificationDate: string;
  state: number;
}

export class Version {
  version: string;
  descripcion: string;
  descripcionAdicional: string;
  nombreRapiVenta: string;
  apkRapiVenta: File;
  nombreRapiFirma: string;
  apkRapiFirma: File;
  estaEnPlayStore: boolean;
  estado: number;
}

export class RegistrarVersionesEmpresasRequest {
  versionesAsignadasDTOS: Version[];
  ruc: String;
}

/* ***********************AUDITORIA************************** */
export class AuditoriaDTO {
  usuario: string;
}

/* ***********************CERTIFICADO************************** */
export class CertificadoDTO extends AuditoriaDTO {
  codigo: string;
  ruc: string;
  nombreArchivo: string;
  fechaCaducidad: string;
  estado: number;
}

export class CertificadoListadoDTO extends CertificadoDTO {
  nombreArchivoStorage: string;
  ubicacionArchivo: string;
}

export class CertificadoRegistroDTO extends CertificadoDTO {
  archivoBase64: string;
}

export class ListarCertificadoRequest extends PaginacionRequest {
}

export class RegistrarCertificadoRequest {
  certificadoDTO: CertificadoRegistroDTO;
}

/* ***********************VERSION************************** */
export class VersionDTO extends AuditoriaDTO {
  version: string;
  descripcion: string;
  solucion: string;
  nombreArchivo: string;
  estado: number;
}

export class VersionListadoDTO extends VersionDTO {
  nombreArchivoStorage: string;
  ubicacionArchivo: string;
}

export class VersionRegistroDTO extends VersionDTO {
  archivoBase64: string;
}

export class ListarVersionRequest extends PaginacionRequest {
}

export class RegistrarVersionRequest {
  versionDTO: VersionRegistroDTO;
}

/* ***********************PROGRAMACIÓN************************** */
export class DetalleProgramacionDTO {
  idPuntoVenta: string;
  codigoPuntoVenta: string;
  macPuntoVenta: string;
}

export class DetalleProgramacionListadoDTO extends DetalleProgramacionDTO {
  nombrePuntoVenta: string;
  estado: number;
  descripcionEstado: string;
}

export class ProgramacionDTO extends AuditoriaDTO {
  id: string;
  ruc: string;
  fechaActualizacion: string;
  horaMinutoActualizacion: string;
  tipoComponente: number;
  identificadorComponente: string;
  ubicacionArchivo: string;
  nombreComponente: string;
  version: string;
  actividad: number;
  estado: number;
  detalleProgramacionDTO: DetalleProgramacionDTO[];
}

export class ProgramacionActualizacionDTO extends ProgramacionDTO {
  id: string;
  ubicacionArchivo: string;
  detalleProgramacionDTO: DetalleProgramacionDTO[];
}

export class ListarProgramacionRequest extends PaginacionRequest {
  tipoComponente: number;
  ruc: string;
}

export class ActualizarProgramacionRequest {
  programacionDTO: ProgramacionActualizacionDTO;
}

export class RegistrarProgramacionRequest {
  programacionDTO: ProgramacionDTO;
}

/* ***********************PUNTO DE VENTA************************** */
export class PuntoVentaDTO {
  codigo: string;
  nombre: string;
  ruc: string;
  mac: string;
  versionInstalada: string;
  direccionInstalacion: string;
  puerto: string;
  nombreSuscriptor: string;
  estado: number;
}

export class PuntoVentaListadoDTO extends PuntoVentaDTO {
  id: string;
}

export class ListarPuntoVentaRequest extends PaginacionRequest {
}

export class Serie {
  id:string;
  idDolares:string;
  idEuros:string;
  descripcionDolares:string;
  descripcionEuros:string;
  tipoCambioDolares:number;
  tipoCambioEuros:number;
}

export class Calcular {
  monto:number;
  montoConTipoCambio: number;
  monedaOrigen: string;
  monedaDestino: string;
  tipoCambio: number;
}

export class RequestCalcular{
  monto:number;
  monedaOrigen:string;
  monedaDestino:string;
}
