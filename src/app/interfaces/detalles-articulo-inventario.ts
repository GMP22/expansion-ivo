export interface DetallesArticuloInventario {
        id_articulo_clinica:number,
        id_articulo:number,
        nombre:string,
        estado:string,
        lotes_disponibles:number
        stock_minimo:number,
        pedido_automatico:number,
}
