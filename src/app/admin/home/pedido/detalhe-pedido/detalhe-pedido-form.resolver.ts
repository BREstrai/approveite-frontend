import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PedidoCompleto} from "..//pedido-completo.domain";
import {PedidoService} from "../lista-pedido/pedido.service";

@Injectable()
export class DetalhePedidoFormResolver implements Resolve<PedidoCompleto> {

    constructor(private pedidoDet: PedidoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PedidoCompleto> {
        return this.pedidoDet.findDetByPedido(route.params.idPedido);
    }

}
