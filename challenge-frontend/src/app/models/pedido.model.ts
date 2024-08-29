import { Producto } from "./producto.model";

export interface Pedido{
    productos: Producto[];
    vendedorId: number | null;
}