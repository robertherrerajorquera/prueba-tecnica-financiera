import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-tecnica-financiera';
  dolarActual: number | null = null;
  euroActual: number | null = null;
  ufActual: number | null = null;
  currentYear: number = new Date().getFullYear();

}
