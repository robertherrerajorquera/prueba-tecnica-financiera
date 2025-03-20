import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { calcularDias } from '../utils/calcularDias';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsoApiService {
  private tipoRecurso: string = "dolar";
  private urlBase:string = "https://api.sbif.cl/api-sbifv3/recursos_api/";
  private APIKey:string = "?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json";
  private constructorUrl: string="";
  private calcularDias: calcularDias = new calcularDias;
  private fullTreintaDias: Observable<any>=EMPTY;
  private fullYear: Observable<any> = EMPTY;
  private tipoIndicador: string = "";

  constructor(private http: HttpClient) { }

  getDetalleGeneralDay(): Observable<any> {
    return this.http.get(`${this.urlBase}`);// Dólar EE.UU. para el día actual.
  }
  getDetalleGeneralYear(tipoIndicador: string): void {// Dólar EE.UU.  para cada día del año
    this.calcularDias.treintaDias();
    this.setTipoIndicador(tipoIndicador);
    this.tipoRecurso = tipoIndicador + "/"+ this.calcularDias.anoActual;

    this.constructorUrl = this.urlBase + this.tipoRecurso + this.APIKey;
    console.log(" por anio", this.constructorUrl)
    this.fullYear = this.http.get(this.constructorUrl)
   // https://api.sbif.cl/api-sbifv3/recursos_api/utm/2025?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json
   // return this.http.get(this.constructorUrl);
  }

  getDetalleGeneral30Days(tipoIndicador: string): void {
    this.calcularDias.treintaDias();
    this.setTipoIndicador(tipoIndicador);
    this.tipoRecurso = tipoIndicador + "/periodo/"
      + this.calcularDias.anoAnterior + "/" + this.calcularDias.mesAnterior + "/dias_i/" +
      this.calcularDias.diaAnterior + "/" + this.calcularDias.anoActual + "/" + this.calcularDias.mesActual + "/dias_f/" + this.calcularDias.diaActual;
    this.constructorUrl = this.urlBase + this.tipoRecurso + this.APIKey;
    console.log("constructor", this.constructorUrl)
    this.fullTreintaDias = this.http.get(this.constructorUrl);
  }
  // el formato del dolar es el correcto, no el que aparecia en la api
  // dolar https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/2010/01/dias_i/04/2010/01/dias_f/05?apikey=SBIF9990SBIF44b7SBIF7f4c5a537d02358e1099&formato=xml
  // euro https://api.sbif.cl/api-sbifv3/recursos_api/euro/periodo/2010/01/04/2010/01/05?apikey=SBIF9990SBIF44b7SBIF7f4c5a537d02358e1099&formato=xml //formato con errores
  // uf  https://api.sbif.cl/api-sbifv3/recursos_api/UF/posteriores/2010/01/dias/01?apikey=SBIF9990SBIF44b7SBIF7f4c5a537d02358e1099&formato=xml //formato incorrecto

  getfullTreintaDias() {
    return this.fullTreintaDias;
  }
  getFullYear() {
    return this.fullYear;
  }
  setTipoIndicador(indicador:string){
    this.tipoIndicador = indicador;
  }
  setInitialize(){
    this.constructorUrl="";
    this.calcularDias= new calcularDias;
    this.fullTreintaDias=EMPTY;
    this.fullYear= EMPTY;
    this.tipoIndicador = "";
  }
  getTipoIndicador(){
    return this.tipoIndicador;
  }

  getDetalleEspecifico(): any {
    return this.http.get(`${this.urlBase}`);
  }
}
