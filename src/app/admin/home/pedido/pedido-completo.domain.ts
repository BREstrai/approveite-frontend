import { Pedido } from './lista-pedido/pedido.domain';
import { DetalhePedido } from './detalhe-pedido/detalhe-pedido.domain';

export class PedidoCompleto {
    pedido: Pedido;
    pedidoDetalhe: DetalhePedido[];
}