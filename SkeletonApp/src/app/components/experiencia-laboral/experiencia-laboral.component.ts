import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent  implements OnInit {

  empresa: any;
  annoInicio: any;
  annoToggle: any;
  annoTermino: any;
  disableAnnoTermino: boolean = false;
  cargo: any;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('empresa')!='null'){
      this.empresa = localStorage.getItem('empresa');
    }
    if(localStorage.getItem('annoInicio')!='null'){
      this.annoInicio = localStorage.getItem('annoInicio');
    }
    if(localStorage.getItem('annoToggle')!='null'){
      if(localStorage.getItem('annoToggle')=='true'){
        this.annoToggle = true;
        this.disableAnnoTermino = true;
      } else {
        this.annoToggle = false;
        this.disableAnnoTermino = false;
      }
    }
    if(localStorage.getItem('annoTermino')!='null'){
      this.annoTermino = localStorage.getItem('annoTermino');
    }
    if(localStorage.getItem('cargo')!='null'){
      this.cargo = localStorage.getItem('cargo');
    }
  }

  guardar(){
    localStorage.setItem('empresa', this.empresa);
    localStorage.setItem('annoInicio', this.annoInicio);
    localStorage.setItem('annoToggle',this.annoToggle);
    if(this.disableAnnoTermino==false){
      localStorage.setItem('annoTermino', this.annoTermino);
    }
    localStorage.setItem('cargo', this.cargo);
  }

  displayAnnoTermino(){
    if(this.annoToggle==true){
      this.disableAnnoTermino = true;
    } else {
      this.disableAnnoTermino = false;
    }
  }

}
