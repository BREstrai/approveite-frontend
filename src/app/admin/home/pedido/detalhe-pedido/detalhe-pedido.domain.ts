import { Pedido } from '../lista-pedido/pedido.domain';

export class DetalhePedido {
    idPedidoDetalhe: number;
    idPedido: Pedido;
    idKit: number;
    idProduto: number;
    valUnitario: string;
    valDesconto: string;
    qtdItem: string;
}