import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* variables van sobre el constructor */
  constructor(private router: Router, private dbTaskService : DBTaskService) { }
  //funciones abajo


  ionViewDidEnter(){
    this.router.navigate(['home/mis-datos']);
  }

  ngAfterViewInit(){ }

  cerrarSesion(){
    this.dbTaskService.modificarSesionDataActive(localStorage.getItem('usuarioSesion'), 0);
    localStorage.clear();
    this.router.navigate(['/']);
  }
  navCert() {
    this.router.navigate(['home/certificados']);
  }
  navExp() {
  this.router.navigate(['home/experiencia-laboral']);
  }
  navDatos() {
    this.router.navigate(['home/mis-datos']);
  }
}
