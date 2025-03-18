import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { UsoApiService } from 'src/app/services/uso-api.service';
import { DetalleGeneralComponent } from '../detalle-general/detalle-general.component';
import { DetalleEspecificoComponent } from '../detalle-especifico/detalle-especifico.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  // @ViewChild(DetalleGeneralComponent) detallesGeneralesData!: DetalleGeneralComponent;
  @ViewChild(DetalleEspecificoComponent) detallesEspecificosData!: DetalleEspecificoComponent;
  detallesGeneralesData: any;
  constructor(private router: Router, private usoApi: UsoApiService) { }
  faCircleInfo = faCircleInfo;
  listaIndicadores: string[] = [
    "Dólar",
    "Euro",
    "IPC",
    "Tasa de Interés Máxima Convencional",
    "Tasa TAB UF 360",
    "UF",
    "UTM"
  ];
  redirectDetalleGeneral(indicador: string) {
    switch (indicador) {
      case "Dólar":
        indicador = "dolar"
        break;
      case "Euro":
        indicador = "euro"
        break;
      case "UF":
        indicador = "uf";
        break;
    }
   // indicador = indicador == "Dólar" ? "dolar" : indicador;
    console.log("indicador", indicador)
    this.usoApi.getDetalleGeneral30Days(indicador);
    this.router.navigate(['/detalle-general']);
  }

  redirectDetalleEspecifico(indicador: string) {
    const detallesEspecificos = this.usoApi.getDetalleEspecifico();
    this.detallesEspecificosData.dataIndicadorEspecifico = detallesEspecificos;
    this.router.navigate(['/detalle-especifico']);
  }

}
