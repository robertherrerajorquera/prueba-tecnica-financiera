export interface Indicadores {

}
export interface MonedaValor {
  Valor: string;  // Se mantiene como string porque tiene coma como separador decimal
  Fecha: string;  // Formato "YYYY-MM-DD"
}

export interface MonedasData {
  Monedas: MonedaValor[];
}
