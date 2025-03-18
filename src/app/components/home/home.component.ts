import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { UsoApiService } from 'src/app/services/uso-api.service';
import { DetalleGeneralComponent } from '../detalle-general/detalle-general.component';
import { DetalleEspecificoComponent } from '../detalle-especifico/detalle-especifico.component';
import { DolaresData } from '../../models/indicadores';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  // @ViewChild(DetalleGeneralComponent) detallesGeneralesData!: DetalleGeneralComponent;
  @ViewChild(DetalleEspecificoComponent) detallesEspecificosData!: DetalleEspecificoComponent;
  detallesGeneralesData: DolaresData = { Dolares: [] };
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
    indicador = indicador == "Dólar" ? "dolar" : indicador;
    console.log("indicador", indicador)
    this.consultaApi(indicador);

  //    this.router.navigate(['/detalle-general'], { queryParams:   this.detallesGeneralesData  });


  }
  consultaApi(indicador: string) {
   this.usoApi.getDetalleGeneral30Days(indicador).subscribe((result:any) => {
     this.detallesGeneralesData = result;
     this.router.navigate(['/detalle-general'], { queryParams:   this.detallesGeneralesData  });

   });
    // this.usoApi.getDetalleGeneral30Days(indicador).subscribe((result: any) => {
    //   // Validamos si 'result' no es undefined ni null
    //   console.log("a")
    //   if (result) {
    //     this.detallesGeneralesData = result;
    //     console.log("result ok", this.detallesGeneralesData)

    //   } else {
    //     console.error('El resultado de la API es inválido o está vacío');
    //     // Aquí puedes agregar algún tipo de lógica para manejar el error o mostrar un mensaje al usuario
    //   }
    // },
    //   (error: any) => {
    //     // Manejo de errores si la llamada a la API falla
    //     console.error('Error al obtener los datos de la API', error);
    //   });
  }
  redirectDetalleEspecifico(indicador: string) {
    const detallesEspecificos = this.usoApi.getDetalleEspecifico();
    this.detallesEspecificosData.dataIndicadorEspecifico = detallesEspecificos;
    this.router.navigate(['/detalle-especifico']);
  }

}
