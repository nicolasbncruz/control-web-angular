import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewRef,} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MensajeGenericoComponent} from '../shared/mensaje-generico/mensaje-generico.component';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Constante} from '../../constantes/constante';
import {Router} from '@angular/router';
import {ReusableService} from '../../services/reusable.service';
import {SesionService} from '../../services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class HomeComponent implements OnInit {
  idleState = 'No Started';
  showIdle = false;
  constructor(private idle: Idle,
              private keepalive: Keepalive,
              private sesionService:SesionService,
              private router:Router,
              public _dialog:MatDialog,
              private reusable: ReusableService,
              private cd:ChangeDetectorRef,) {
              }

  ngOnInit() {
    this.reusable.ngLeerConfiguracion().subscribe(
      data => {
        this.idle.setIdle(this.ngValidarTimeOutSesion(data['timeOutSesion']));
        this.idle.setTimeout(this.ngValidarContadorTimeOut(data['contadorTimeOut']));
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleEnd.subscribe(() => {
          this.idleState = 'Activo';
          setTimeout(this.reset(),0);
        });
        this.idle.onTimeout.subscribe(() => {
          this.idleState = '';
          this.showIdle = false;
          if(this.sesionService.getSesionGlobal()!=null){
            let dialogRef;
            setTimeout(() =>
                dialogRef = this._dialog.open(MensajeGenericoComponent, {
                  width: '470px',
                  data: {
                    color:"#062a78",
                    icon: "access_time",
                    titulo:"Desconectado",
                    mensaje:`¡Superaste el tiempo máximo de inactividad permitido! <strong>(10 minutos)</strong>.<br>Es necesario que vuelvas a ingresar tus credenciales.`
                  }
                })
              , 0);
          }
          this.sesionService.closeSession();
        });
        this.idle.onIdleStart.subscribe(() => this.idleState = 'Has sido desactivado');
        this.idle.onTimeoutWarning.subscribe((countdown) => {
          this.idleState = 'Tu sesión expirará en ' + countdown + ' segundos.';
          this.showIdle=true;
        });
        setTimeout(this.reset(),0);
      });
  }

  rutasPermitidasActivas(){
    let rpta:boolean=false;
    let ruta:string=this.router.url;
    const RUTAHOME:string="/home";
    if((ruta!=null||ruta!=undefined) && ruta.substr(0,RUTAHOME.length)== RUTAHOME){
      rpta=!rpta;
    }
    return rpta;
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.showIdle=false;
    if(this.cd!= null)
    if ( this.cd !== null &&
            this.cd !== undefined &&
            ! ((this.cd as ViewRef).destroyed)){
              this.cd.detectChanges();
            }
  }

  ngValidarTimeOutSesion(valor) {
    return isNaN(Number(valor)) ? Constante.INACTIVIDAD.timeOutSesion : Number(valor);
  }

  ngValidarContadorTimeOut(valor) {
    return isNaN(Number(valor)) ? Constante.INACTIVIDAD.contadorTimeOut : Number(valor);
  }

}
