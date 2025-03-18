import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-especifico',
  templateUrl: './detalle-especifico.component.html',
  styleUrls: ['./detalle-especifico.component.scss']
})
export class DetalleEspecificoComponent {
  @Input() dataIndicadorEspecifico="";
}
