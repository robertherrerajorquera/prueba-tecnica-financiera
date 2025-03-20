import { Indicadores } from './../../models/indicadores';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { UsoApiService } from 'src/app/services/uso-api.service';
import { DetalleGeneralComponent } from '../detalle-general/detalle-general.component';
import { DetalleEspecificoComponent } from '../detalle-especifico/detalle-especifico.component';

export interface IListaIndicadores{
  titulo:string;
  valor:string;
}

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
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("iniciando...")
    this.usoApi.setInitialize();
  }
  faCircleInfo = faCircleInfo;

  listaIndicadores:IListaIndicadores[] = [
    {titulo: "Dólar",valor:"dolar"},
    {titulo: "Euro",valor:"euro"},
    {titulo: "IPC",valor:"ipc"},
    {titulo: "UF",valor:"uf"},
    {titulo: "UTM",valor:"utm"}
  ]


  yearOrMonthDetail(indicador: string) {
    switch (indicador) {
      case "dolar":
      case "euro":
      case "uf":
        console.log("pepe")
        this.usoApi.getDetalleGeneral30Days(indicador);
        this.router.navigate(['/detalle-general']);
        break;
      case "ipc":
      case "utm":
        console.log("juan")
        this.usoApi.getDetalleGeneralYear(indicador);
        this.router.navigate(['/detalle-general']);
        break;
    }
  }
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
      case "IPC":
        indicador = "ipc";
        break;
      case "UTM":
        indicador = "utm";
        break;
    }
    this.yearOrMonthDetail(indicador)
    console.log("indicador", indicador)

  }

  redirectDetalleEspecifico(indicador: string) {
    const detallesEspecificos = this.usoApi.getDetalleEspecifico();
    this.detallesEspecificosData.dataIndicadorEspecifico = detallesEspecificos;
    this.router.navigate(['/detalle-especifico']);
  }

}
