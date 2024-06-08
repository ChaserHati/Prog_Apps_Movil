import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonInput } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent  implements OnInit {
  
  @ViewChildren(IonInput, { read: ElementRef })
  inputElements: QueryList<ElementRef<HTMLIonInputElement>> | any;

  username: string = "";
  password!: number;
  nombre: string = "";
  apellido: string = "";
  educacion: string = "";
  alertButtons = ['OK'];
  date: any;

  private animation!: Animation;

  constructor(private activerouter: ActivatedRoute, private router: Router, private animationCtrl: AnimationController) { 
    this.activerouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation()?.extras?.state){
        this.username = this.router.getCurrentNavigation()?.extras?.state?.['usernameInput'];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.['passwordInput'];
      }
    })
  }

  ngOnInit() {}

  ngAfterViewInit(){
    const itemA = this.animationCtrl
    .create()
    .addElement(this.inputElements.get(0).nativeElement)
    .duration(1000)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'translate(0px)'},
      { offset: 0.5, transform: 'translate(50px)'},
      { offset: 1, transform: 'translate(0px)'}
    ]);

    const itemB = this.animationCtrl
    .create()
    .addElement(this.inputElements.get(1).nativeElement)
    .duration(1000)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'translate(0px)'},
      { offset: 0.5, transform: 'translate(50px)'},
      { offset: 1, transform: 'translate(0px)'}
    ]);

    this.animation = this.animationCtrl
    .create()
    .duration(1000)
    .iterations(1)
    .addAnimation([itemA, itemB])
  }

  limpiar(){
    this.nombre = "";
    this.apellido = "";
    this.educacion = "";
    this.date = null;
    this.animation.play();
  }
}
