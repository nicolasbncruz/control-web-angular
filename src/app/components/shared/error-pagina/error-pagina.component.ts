import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Routers} from '../../../constantes/routers';
import {SesionService} from '../../../services/sesion.service';

@Component({
  selector: 'app-error-pagina',
  templateUrl: './error-pagina.component.html',
  styleUrls: ['./error-pagina.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})

export class ErrorPaginaComponent implements OnInit {

  constructor(private router:Router,
              private sesionService:SesionService) { }

  ngOnInit() {
    setTimeout( () => {
      this.sesionService.closeSession();
    }, 5000);
  }

  ngCancelar() {
    this.sesionService.closeSession();
  }

}
