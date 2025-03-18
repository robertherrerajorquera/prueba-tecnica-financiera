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
    // First, set the indicator type (assuming it's "dolar" if not set)
    const indicadorTipo = this.usoApi.getTipoIndicador() || "dolar"
    this.tipoIndicador = indicadorTipo

    // Make sure to call getDetalleGeneral30Days first
    this.usoApi.getDetalleGeneral30Days(indicadorTipo)

    // Then subscribe to the Observable
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
          // Handle if the response is an array directly
          this.detallesGenerales = {
            Monedas: result.map((item: any) => ({
              Fecha: item.Fecha,
              Valor: item.Valor,
            })),
          }
        } else if (result) {
          // Try to adapt to whatever structure comes back
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
