export class Routers {
  public static CALCULAR = 'calcular';
  public static RECOVER = 'recover';
  public static HOME = 'home';
  public static DASHBOARD = 'dashboard';
  public static ERRORDIALOG = 'errorDialog';
  public static ERRORPAGINA = 'error';

  public static obtenerRutaHome(ruta:string) {
    return `${this.HOME}/${ruta}`;
  }

}
