import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = "";
  password!: number;
  nombre: string = "";
  apellido: string = "";
  educacion: string = "";
  alertButtons = ['OK'];
  date: any;

  /* variables van sobre el constructor */
  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation()?.extras?.state){
        this.username = this.router.getCurrentNavigation()?.extras?.state?.['usernameInput'];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.['passwordInput'];
      }
    })
  }

  limpiar(){
    this.nombre = "";
    this.apellido = "";
    this.educacion = "";
    this.date = null;
  }

}
