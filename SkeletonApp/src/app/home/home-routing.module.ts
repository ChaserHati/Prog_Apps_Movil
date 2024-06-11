import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MisDatosComponent } from '../components/mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from '../components/experiencia-laboral/experiencia-laboral.component';
import { CertificadosComponent } from '../components/certificados/certificados.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'mis-datos',
        component: MisDatosComponent,
      },
      {
        path: 'experiencia-laboral',
        component: ExperienciaLaboralComponent,
      },
      {
        path: 'certificados',
        component: CertificadosComponent,
      },
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
