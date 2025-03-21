import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import * as Chart from 'chart.js/auto';
import { MonedasData } from 'src/app/models/indicadores';
import { UsoApiService } from 'src/app/services/uso-api.service';

@Component({
  selector: 'app-detalle-especifico',
  templateUrl: './detalle-especifico.component.html',
  styleUrls: ['./detalle-especifico.component.scss']
})
export class DetalleEspecificoComponent {
  @ViewChild('graficoCanvas') graficoCanvas!: ElementRef<HTMLCanvasElement>;

  detallesGenerales: MonedasData = { Monedas: [] };
  isLoading: boolean = true;
  tipoIndicador: string = "";
  nombreIndicador: string = "";
  unidadMedida: string = "";
  valorActual: string = "";
  fechaActual: string = "";
 // grafico: Chart | null = null;
  constructor(private usoApi: UsoApiService, private router: Router){}
  ngOnInit(): void {
    this.mostrarDetalles();
  }

  mostrarDetalles(): void {
    const indicadorTipo = this.usoApi.getTipoIndicador() || "dolar";
    this.tipoIndicador = indicadorTipo;

    // Establecer nombre y unidad de medida según el tipo de indicador
    switch(this.tipoIndicador) {
      case 'dolar':
        this.nombreIndicador = "Dólar";
        this.unidadMedida = "Pesos";
        break;
      case 'euro':
        this.nombreIndicador = "Euro";
        this.unidadMedida = "Pesos";
        break;
      case 'uf':
        this.nombreIndicador = "UF";
        this.unidadMedida = "Pesos";
        break;
      case 'ipc':
        this.nombreIndicador = "IPC";
        this.unidadMedida = "%";
        break;
      case 'utm':
        this.nombreIndicador = "UTM";
        this.unidadMedida = "Pesos";
        break;
      default:
        this.nombreIndicador = "Indicador";
        this.unidadMedida = "";
    }

    // Verificar si necesitamos datos de 30 días o del año
    if (['dolar', 'euro', 'uf'].includes(this.tipoIndicador)) {
      this.cargarDatos30Dias();
    } else {
      this.cargarDatosAnuales();
    }
  }

  cargarDatos30Dias(): void {
    this.usoApi.getfullTreintaDias().subscribe({
      next: (result: any) => {
        console.log("Datos recibidos:", result);

        if (result) {
          let datos: any[] = [];

          switch (this.tipoIndicador) {
            case 'dolar':
              datos = result.Dolares || [];
              this.detallesGenerales = {
                Monedas: datos.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor}`
                }))
              };
              break;
            case 'euro':
              datos = result.Euros || [];
              this.detallesGenerales = {
                Monedas: datos.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor}`
                }))
              };
              break;
            case 'uf':
              datos = result.UFs || [];
              this.detallesGenerales = {
                Monedas: datos.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor}`
                }))
              };
              break;
            default:
              this.detallesGenerales = { Monedas: [] };
              console.warn('Tipo de indicador no reconocido:', this.tipoIndicador);
              break;
          }

          // Establecer valor actual y fecha
          if (this.detallesGenerales.Monedas.length > 0) {
            const primerValor = this.detallesGenerales.Monedas[0];
            this.valorActual = primerValor.Valor;
            this.fechaActual = primerValor.Fecha;

            // Crear gráfico después de que los datos estén disponibles
            setTimeout(() => {
              this.crearGrafico();
            }, 100);
          }
        } else {
          this.detallesGenerales = { Monedas: [] };
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error("Error al obtener los datos", error);
        this.isLoading = false;
      },
    });
  }

  cargarDatosAnuales(): void {
    this.usoApi.getFullYear().subscribe({
      next: (result: any) => {
        console.log("Datos recibidos:", result);

        if (result) {
          let datos: any[] = [];

          switch (this.tipoIndicador) {
            case 'ipc':
              datos = result.IPCs || [];
              this.detallesGenerales = {
                Monedas: datos.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor}`
                }))
              };
              break;
            case 'utm':
              datos = result.UTMs || [];
              this.detallesGenerales = {
                Monedas: datos.map((item: any) => ({
                  Fecha: item.Fecha,
                  Valor: `${item.Valor}`
                }))
              };
              break;
            default:
              this.detallesGenerales = { Monedas: [] };
              console.warn('Tipo de indicador no reconocido:', this.tipoIndicador);
              break;
          }

          // Establecer valor actual y fecha
          if (this.detallesGenerales.Monedas.length > 0) {
            const primerValor = this.detallesGenerales.Monedas[0];
            this.valorActual = primerValor.Valor;
            this.fechaActual = primerValor.Fecha;

            // Crear gráfico después de que los datos estén disponibles
            setTimeout(() => {
              this.crearGrafico();
            }, 100);
          }
        } else {
          this.detallesGenerales = { Monedas: [] };
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error("Error al obtener los datos", error);
        this.isLoading = false;
      },
    });
  }

  crearGrafico(): void {
    if (!this.graficoCanvas || this.detallesGenerales.Monedas.length === 0) {
      return;
    }

    // Obtener los últimos 10 valores para el gráfico (o menos si no hay suficientes)
    const datosGrafico = this.detallesGenerales.Monedas.slice(0, 10).reverse();

    const fechas = datosGrafico.map(item => {
      const fecha = new Date(item.Fecha);
      return fecha.toISOString().split('T')[0];
    });

    const valores = datosGrafico.map(item => {
      // Convertir a número y eliminar cualquier símbolo de moneda
      return parseFloat(item.Valor.replace(/[^\d.-]/g, ''));
    });

    const ctx = this.graficoCanvas.nativeElement.getContext('2d');

    if (ctx) {
      // Destruir gráfico anterior si existe
      // if (this.grafico) {
      //   this.grafico.destroy();
      // }

      // this.grafico = new Chart(ctx, {
      //   type: 'line',
      //   data: {
      //     labels: fechas,
      //     datasets: [{
      //       label: this.nombreIndicador,
      //       data: valores,
      //       borderColor: 'white',
      //       backgroundColor: 'rgba(255, 255, 255, 0.1)',
      //       borderWidth: 2,
      //       pointBackgroundColor: 'white',
      //       pointRadius: 4,
      //       tension: 0.1,
      //       fill: false
      //     }]
      //   },
      //   options: {
      //     responsive: true,
      //     maintainAspectRatio: false,
      //     plugins: {
      //       legend: {
      //         display: false
      //       },
      //       tooltip: {
      //         callbacks: {
      //           label: function(context:any) {
      //             return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
      //           }
      //         }
      //       },
      //       datalabels: {
      //         align: 'top',
      //         anchor: 'end',
      //         color: 'white',
      //         font: {
      //           weight: 'bold'
      //         },
      //         formatter: (value:any) => {
      //           return value.toFixed(2);
      //         }
      //       }
      //     },
      //     scales: {
      //       x: {
      //         grid: {
      //           color: 'rgba(255, 255, 255, 0.1)'
      //         },
      //         ticks: {
      //           color: 'white'
      //         }
      //       },
      //       y: {
      //         beginAtZero: false,
      //         grid: {
      //           color: 'rgba(255, 255, 255, 0.1)'
      //         },
      //         ticks: {
      //           color: 'white'
      //         }
      //       }
      //     }
      //   }
      // });
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/home']);
  }

  verGrafico(): void {
    this.router.navigate(['/detalle-especifico']);
    //this.usoApi.getDetalleEspecifico(this.tipoIndicador); // falta agregarlo al servicio y ver los datos del grafico
  }

  formatearValor(valor: string): string {
    const numero = parseFloat(valor.replace(/[^\d.-]/g, ''));
    if (isNaN(numero)) {
      return valor;
    }

    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numero);
  }
}
