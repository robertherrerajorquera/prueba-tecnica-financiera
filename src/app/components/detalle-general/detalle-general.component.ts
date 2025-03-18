import { Component, Input } from '@angular/core';
import { DolaresData,DolarValor } from '../../models/indicadores';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-general',
  templateUrl: './detalle-general.component.html',
  styleUrls: ['./detalle-general.component.scss']
})
export class DetalleGeneralComponent {
  detallesGenerales:  DolaresData = { Dolares: [] };
  isLoading:boolean=true;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.detallesGenerales = params;
      if(this.detallesGenerales) this.isLoading = false;
    });
    console.log(this.detallesGenerales)
  }


}
