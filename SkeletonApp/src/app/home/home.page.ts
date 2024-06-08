import { Component, } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segmento: string="misDatos";
  /* variables van sobre el constructor */
  constructor() { }

  ngAfterViewInit(){ }

}
