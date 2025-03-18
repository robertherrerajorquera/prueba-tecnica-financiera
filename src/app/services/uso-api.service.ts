import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { calcularDias } from '../utils/calcularDias';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsoApiService {
  payload = "/2020";
  tipoRecurso: string = "dolar";
  urlBase = "https://api.sbif.cl/api-sbifv3/recursos_api/";
  APIKey = "?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json";
  constructorUrl: string = "";
  public calcularDias: calcularDias = new calcularDias;

  constructor(private http: HttpClient) { }
  getLista(tipoRecurso: string): any {// queda en any hasta que se tenga acceso a la api   
    return this.http.get(`${this.urlBase}`);// Dólar EE.UU. para el día actual.
  }
  getDetalleGeneralDay(): any {
    return this.http.get(`${this.urlBase}`);// Dólar EE.UU. para el día actual.
  }
  getDetalleGeneralYear(tipoRecurso: string, payload: string): any {// Dólar EE.UU.  para cada día del año 
    this.tipoRecurso = "dolar" + this.payload;
    // this.tipoRecurso = tipoRecurso + payload;
    // urlYear = "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/2010?apikey=SBIF9990SBIF44b7SBIF7f4c5a537d02358e1099&formato=xml";
    return this.http.get(`${this.urlBase}`);
  }
  getDetalleGeneral30Days(tipoRecurso: string): any {// entre la fecha que se indique
    //urlMonthYear = " https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/2010/01/dias_i/04/2010/01/dias_f/05?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=xml"
    this.calcularDias.treintaDias();
    //  dolar/periodo/2025/2/dias_i/0/0/dias_f/15
    this.tipoRecurso = tipoRecurso + "/periodo/" + this.calcularDias.anoAnterio + "/" + this.calcularDias.mesAnterior + "/dias_i/" + this.calcularDias.diaActual + "/" + this.calcularDias.anoActual + "/" + this.calcularDias.mesActual + "/dias_f/" + this.calcularDias.diaAnterior;
    this.constructorUrl = this.urlBase + this.tipoRecurso + this.APIKey;
    return this.http.get(`${this.constructorUrl}`);
  }
  // https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/2020/02/dias_i/17/2020/03/dias_f/17?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json
  // https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/2025/02/dias_i/2025/03/dias_f/15?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json


  getDetalleEspecifico(): any {
    return this.http.get(`${this.urlBase}`);
  }
}
