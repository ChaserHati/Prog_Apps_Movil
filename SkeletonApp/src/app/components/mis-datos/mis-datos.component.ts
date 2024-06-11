import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent  implements OnInit {
  username! : any;
  nombre! : any;
  apellido!: any;
  fechnac: any = null;
  formatedFechnac!: any;
  educacion!: any;
  alertButtons = ['OK'];

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('usuarioSesion');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.educacion = localStorage.getItem('educacion');
    if(localStorage.getItem('fechnac')!='undefined'){
      this.fechnac = localStorage.getItem('fechnac');
    }
  }

  formatFechnac(){
    this.formatedFechnac = this.fechnac.split('T')[0];
  }

  guardar(){
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('apellido', this.apellido);
    localStorage.setItem('educacion', this.educacion);
    localStorage.setItem('fechnac', this.formatedFechnac);
  }
}
