export interface Indicadores {

}
export interface DolarValor {
  Valor: string;  // Se mantiene como string porque tiene coma como separador decimal
  Fecha: string;  // Formato "YYYY-MM-DD"
}

export interface DolaresData {
  Dolares: DolarValor[];
}

