import {AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Idle} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {TokenService} from './services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class AppComponent implements OnInit,AfterContentInit  {
  idleState = 'No Started';
  showIdle = false;

  constructor(private idle: Idle,
              private keepalive: Keepalive,
              private tokenS:TokenService,
              private router:Router,
              private cd:ChangeDetectorRef) {
  }

  ngAfterContentInit(){
  }

  ngOnInit(){
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
    this.cd.detectChanges();
  }

}
