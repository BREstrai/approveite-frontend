import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DetalhePedido} from "./detalhe-pedido.domain";
import {PedidoService} from "../lista-pedido/pedido.service";

@Injectable()
export class DetalhePedidoFormResolver implements Resolve<DetalhePedido[]> {

    constructor(private pedidoDet: PedidoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetalhePedido[]> {
        return this.pedidoDet.findDetByPedido(route.params.idPedido);
    }

}
