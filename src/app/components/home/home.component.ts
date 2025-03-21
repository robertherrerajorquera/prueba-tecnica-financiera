import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { UsoApiService } from 'src/app/services/uso-api.service';

export interface IListaIndicadores {
  titulo: string;
  valor: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  detallesGeneralesData: any;
  faCircleInfo = faCircleInfo;

  constructor(private router: Router, private usoApi: UsoApiService) { }

  ngOnInit(): void {
    console.log("iniciando...")
  //  this.usoApi.setInitialize();
  }

  listaIndicadores: IListaIndicadores[] = [
    { titulo: "Dólar", valor: "dolar" },
    { titulo: "Euro", valor: "euro" },
    { titulo: "IPC", valor: "ipc" },
    { titulo: "UF", valor: "uf" },
    { titulo: "UTM", valor: "utm" }
  ]

  yearOrMonthDetail(indicador: string) {
    switch (indicador) {
      case "dolar":
      case "euro":
      case "uf":
        this.usoApi.getDetalleGeneral30Days(indicador);
        this.router.navigate(['/detalle-general']);
        break;
      case "ipc":
      case "utm":
        this.usoApi.getDetalleGeneralYear(indicador);
        this.router.navigate(['/detalle-general']);
        break;
    }
  }
  redirectDetalleGeneral(indicador: string) {
    this.yearOrMonthDetail(indicador)
  }

  redirectDetalleEspecifico(indicador: string) {
    const detallesEspecificos = this.usoApi.getDetalleEspecifico();
    this.router.navigate(['/detalle-especifico']);
  }

}
