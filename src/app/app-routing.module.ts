import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleEspecificoComponent } from './components/detalle-especifico/detalle-especifico.component';
import { DetalleGeneralComponent } from './components/detalle-general/detalle-general.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'detalle-especifico', component: DetalleEspecificoComponent},
  {path: 'detalle-general', component: DetalleGeneralComponent},
  {path: '**', redirectTo:'/home', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
