import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { calcularDias } from '../utils/calcularDias';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsoApiService {
  private tipoRecurso: string = "";
  private urlBase: string = "https://api.sbif.cl/api-sbifv3/recursos_api/";
  private APIKey: string = "?apikey=44b69276a6cb900b3e523b9784514c2dd3fd74b2&formato=json";
  private constructorUrl: string = "";
  private calcularDias: calcularDias = new calcularDias;
  // private fullTreintaDias: Observable<any> = EMPTY;
  // private fullYear: Observable<any> = EMPTY;
  // private tipoIndicador: string = "";

  private tipoIndicadorActual: string = '';
  private detalleGeneral30Days$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private detalleGeneralYear$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private detalleEspecifico$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getDetalleGeneralDay(): Observable<any> {
    return this.http.get(`${this.urlBase}`);// Dólar EE.UU. para el día actual.
  }

   setTipoIndicador(indicador: string) {
     this.tipoIndicadorActual = indicador;
   }


  getDetalleGeneral30Days(codigo: string): void {
    this.calcularDias.treintaDias();
    this.tipoIndicadorActual = codigo;
    this.setTipoIndicador(this.tipoIndicadorActual);
    this.tipoRecurso = this.tipoIndicadorActual + "/periodo/"
      + this.calcularDias.anoAnterior + "/" + this.calcularDias.mesAnterior + "/dias_i/" +
      this.calcularDias.diaAnterior + "/" + this.calcularDias.anoActual + "/" + this.calcularDias.mesActual + "/dias_f/" + this.calcularDias.diaActual;
    this.constructorUrl = this.urlBase + this.tipoRecurso + this.APIKey;
    this.http.get<any>(`${this.constructorUrl}`).subscribe({
      next: (data) => this.detalleGeneral30Days$.next(data),
      error: (error) => {
        console.error(`Error al obtener datos de ${codigo}:`, error);
        this.detalleGeneral30Days$.next(null);
      }
    });
  }

  getDetalleGeneralYear(codigo: string): void {
    this.calcularDias.treintaDias();
    this.tipoIndicadorActual = codigo;
    this.tipoRecurso = this.tipoIndicadorActual + "/" + this.calcularDias.anoActual;

    this.constructorUrl = this.urlBase + this.tipoRecurso + this.APIKey;
    this.http.get<any>(`${this.constructorUrl}`).subscribe({
      next: (data) => this.detalleGeneralYear$.next(data),
      error: (error) => {
        console.error(`Error al obtener datos de ${codigo}:`, error);
        this.detalleGeneralYear$.next(null);
      }
    });
  }

  getfullTreintaDias(): Observable<any> {
    return this.detalleGeneral30Days$.asObservable();
  }

  getFullYear(): Observable<any> {
    return this.detalleGeneralYear$.asObservable();
  }

  getTipoIndicador(): string {
    return this.tipoIndicadorActual;
  }

  getDetalleEspecifico(): any {
    return this.http.get(`${this.urlBase}`);
  }
}
