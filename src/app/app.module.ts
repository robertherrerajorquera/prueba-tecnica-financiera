import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DetalleGeneralComponent } from './components/detalle-general/detalle-general.component';
import { DetalleEspecificoComponent } from './components/detalle-especifico/detalle-especifico.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    DetalleGeneralComponent,
    DetalleEspecificoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
