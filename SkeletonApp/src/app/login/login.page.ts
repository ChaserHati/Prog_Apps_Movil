import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  validUser: boolean = false;
  validPass: boolean = false;
  /* variables van sobre el constructor */
  constructor(private router: Router) { }

  ngOnInit() {
  }

  @ViewChild('inputUsername', { static: true }) inputUsername!: IonInput;

  onInputUsername(ev: { target: any; }) {
    const value = ev.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.inputUsername.value = this.username = filteredValue;
    this.inputUsername.value = this.username = filteredValue;
    if (this.username.length <= 8 && this.username.length >= 3){
      this.validUser = true;
    } else {
      this.validUser = false;
    }
  }

  @ViewChild('inputPassword', { static: true }) inputPassword!: IonInput;

  onInputPassword(ev: { target: any; }) {
    const value = ev.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.inputPassword.value = this.password = filteredValue;
    if (this.password.length == 4){
      this.validPass = true;
    } else {
      this.validPass = false;
    }
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
