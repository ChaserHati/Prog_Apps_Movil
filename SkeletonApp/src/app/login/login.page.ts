import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  arregloSesionData: any = [{
    user_name: '',
    password: '',
    active: ''
  }]

  userExists: boolean = false;
  username: string = "";
  password: string = "";
  /* variables van sobre el constructor */
  constructor(private router: Router, private dbTaskService : DBTaskService) { }

  ngOnInit() {
    this.dbTaskService.dbState().subscribe(res=>{
      if (res){
        this.dbTaskService.fetchSesionData().subscribe(item=>{
          this.arregloSesionData = item;
        })
      }
    })
  }

  checkUserExists(){
    if(this.arregloSesionData.includes(this.username)){
      this.userExists = true;
    } else {
      this.userExists = false;
    }
  }

  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state:{
        user_nameSent : x.user_name,
        passwordSent : x.password,
        activeSent: x.active
      }
    }
    this.router.navigate(['/'], navigationExtras)
  }
  eliminar(x: any){
    this.dbTaskService.eliminarSesionData(x.user_name);
    console.log("SesionData Eliminado")
  }

  enviarDatos(){
    let navigationExtras: NavigationExtras = {
      state: {
        usernameInput: this.username,
        passwordInput: this.password
      }
    }
    localStorage.setItem('username',this.username)
    this.router.navigate(['/home'], navigationExtras);
  }
}
