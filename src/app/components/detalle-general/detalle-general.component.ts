import { Component, TemplateRef } from '@angular/core';
import { MonedasData, MonedaValor } from '../../models/indicadores';
import { UsoApiService } from 'src/app/services/uso-api.service';


@Component({
  selector: 'app-detalle-general',
  templateUrl: './detalle-general.component.html',
  styleUrls: ['./detalle-general.component.scss']
})
export class DetalleGeneralComponent {
  detallesGenerales: MonedasData = { Monedas: [] };
  isLoading:boolean=true;
  tipoIndicador: string = "";
  constructor( private usoApi: UsoApiService) {}
  ngOnInit(): void {
    this.MostrarTodos();
  }
  MostrarTodos(): void {
    const indicadorTipo = this.usoApi.getTipoIndicador() || "dolar"
    this.tipoIndicador = indicadorTipo
    this.usoApi.getDetalleGeneral30Days(indicadorTipo)

    if(this.usoApi.getfullTreintaDias()){
    this.usoApi.getfullTreintaDias().subscribe({
      next: (result: any) => {
        console.log("Datos recibidos:", result)

        if (result ) {
          switch ( this.tipoIndicador) {
            case 'dolar':
              this.detallesGenerales = {
                Monedas: result.Dolares?.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor} USD`,
                })) || [],
              };
              break;
            case 'euro':
              this.detallesGenerales = {
                Monedas: result.Euros?.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor} EUR`,
                })) || [],
              };
              break;
            case 'uf':
              this.detallesGenerales = {
                Monedas: result.UFs?.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor} CLF`,
                })) || [],
              };
              break;
            default:
              this.detallesGenerales = { Monedas: [] };
              console.warn('Tipo de indicador no reconocido:',  this.tipoIndicador);
              break;
          }
        } else if (result && Array.isArray(result)) {
          this.detallesGenerales = {
            Monedas: result.map((item: any) => ({
              Fecha: item.Fecha,
              Valor: item.Valor,
            })),
          }
        } else if (result) {
          this.detallesGenerales = result
        } else {
          this.detallesGenerales = { Monedas: [] }
        }
        this.isLoading = false
      },
      error: (error: any) => {
        console.error("Error al obtener los datos", error)
        this.isLoading = false
      },
    })
    }
    if(this.usoApi.getFullYear()){
    this.usoApi.getFullYear().subscribe({
      next: (result: any) => {
        console.log("Datos recibidos:", result)
        if (result ) {
          switch ( this.tipoIndicador) {
            case 'ipc':
              this.detallesGenerales = {
                Monedas: result.IPCs?.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor} USD`,
                })) || [],
              };
              break;
            case 'utm':
              this.detallesGenerales = {
                Monedas: result.UTMs?.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor} EUR`,
                })) || [],
              };
              break;
            default:
              this.detallesGenerales = { Monedas: [] };
              console.warn('Tipo de indicador no reconocido:',  this.tipoIndicador);
              break;
          }
        } else if (result && Array.isArray(result)) {
          this.detallesGenerales = {
            Monedas: result.map((item: any) => ({
              Fecha: item.Fecha,
              Valor: item.Valor,
            })),
          }
        } else if (result) {
          this.detallesGenerales = result
        } else {
          this.detallesGenerales = { Monedas: [] }
        }
        this.isLoading = false
      },
      error: (error: any) => {
        console.error("Error al obtener los datos", error)
        this.isLoading = false
      },
    })
    }
  }
}
