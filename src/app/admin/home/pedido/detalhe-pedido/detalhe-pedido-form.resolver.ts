import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DetalhePedido} from "./detalhe-pedido.domain";
import {PedidoService} from "../lista-pedido/pedido.service";

@Injectable()
export class DetalhePedidoFormResolver implements Resolve<DetalhePedido> {

    constructor(private configuracaoReciboDigitalService: PedidoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetalhePedido> {
        // @ts-ignore
        return this.configuracaoReciboDigitalService.findOne(route.params.id);
    }

}
