import { Component, OnInit, } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  username: string = "";
  password: string = "";

  /* variables van sobre el constructor */
  constructor(private dbTaskService : DBTaskService, private router: Router) { }

  ngOnInit() {
    this.dbTaskService.dbState().subscribe((res)=>{
      if (res){
        this.dbTaskService.fetchSesionData().subscribe(item=>{
          this.arregloSesionData = item;
        })
      }
    });
  }

  enviarDatos(){
    let navigationExtras: NavigationExtras = {
      state: {
        usernameInput: this.username,
        passwordInput: this.password
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }

  usuarioExiste(){
    for(let x of this.arregloSesionData){
      if(x.user_name==this.username){
        return x;
      }
    }
    this.dbTaskService.presentToast("Usuario no existe");
  }

  passwordCorrecta(){
    if(this.usuarioExiste().password==this.password){
      return true;
    } else {
      this.dbTaskService.presentToast("Password incorrecta");
      return false;
    }
  }

  activarSesion(){
    this.dbTaskService.modificarSesionDataActive(this.username, 1);
  }

  ingresar(){
    if(this.passwordCorrecta()){
      let navigationExtras: NavigationExtras = {
        state: {
          //datos para interpolar
        }
      }
      this.activarSesion();
      localStorage.setItem('usuarioSesion',this.username);
      this.router.navigate(['/home'], navigationExtras);
    }
  }
}
