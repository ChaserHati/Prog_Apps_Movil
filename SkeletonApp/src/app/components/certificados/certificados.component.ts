import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss'],
})
export class CertificadosComponent  implements OnInit {

  certName: any;
  certObt: any;
  certToggle: any;
  disableCertVenc: boolean = true;
  certVenc: any;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('certName')!='null'){
      this.certName = localStorage.getItem('certName');
    }
    if(localStorage.getItem('certObt')!='undefined'){
      this.certObt = localStorage.getItem('certObt');
    }
    if(localStorage.getItem('certToggle')!='true'){
      this.certToggle = true;
    }else{
      this.certToggle = false;
    }
    if(localStorage.getItem('certVenc')!='undefined'){
      this.certVenc = localStorage.getItem('certVenc');
    }
  }

  guardar(){
    localStorage.setItem('certName', this.certName);
    localStorage.setItem('certObt', this.certObt);
    localStorage.setItem('certToggle', this.certToggle);
    localStorage.setItem('certVenc', this.certVenc);
  }

  displayCertVenc(){
    if(this.certToggle==true){
      this.disableCertVenc = false;
    } else {
      this.disableCertVenc = true;
    }
  }

}
