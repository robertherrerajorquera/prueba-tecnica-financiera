export class calcularDias {
  fechaActual: Date;

  diaActual: string = "";
  mesActual: string = "";
  anoActual: number = 0;
  diaAnterior: string ="";
  mesAnterior: string ="";
  anoAnterior: number = 0;

  constructor() {
    this.fechaActual = new Date();
  }
  public treintaDias() {
    let treintaDiasAtras: Date = new Date(this.fechaActual); 
    treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
    //toLocaleDateString('cl-ES')
    this.seccionarFecha(treintaDiasAtras);
    return { fechaAnterio: treintaDiasAtras, fechaActual: this.fechaActual };
  }

  public anoCompleto() {
    let anoCompletoAtras: Date = new Date();
    return anoCompletoAtras;
  }
  private seccionarFecha(fechaAnterior: Date) {
    this.diaActual = this.anteponerCero(this.fechaActual.getDate());
    this.mesActual = this.anteponerCero(this.fechaActual.getMonth() + 1);
    this.anoActual = this.fechaActual.getFullYear();
    this.diaAnterior = this.anteponerCero(fechaAnterior.getDate());
    this.mesAnterior = this.anteponerCero(fechaAnterior.getMonth() + 1);
    this.anoAnterior = fechaAnterior.getFullYear();
  }
  private anteponerCero(value: number): string {
    return value % 1 === 0 && value < 10 ? `0${value}` : value.toString();
  }

}