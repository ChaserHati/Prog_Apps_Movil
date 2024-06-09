import { Component, OnInit } from '@angular/core';
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

  userExists: boolean = false;
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
}
