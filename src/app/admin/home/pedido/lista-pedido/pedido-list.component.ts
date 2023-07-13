import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {PedidoService} from './pedido.service';
import {Pedido} from './pedido.domain';

@Component({
    templateUrl: './pedido-list.component.html',
    styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListaComponent implements OnInit {

    displayedColumns: string[] = ['idPedido', 'dataPedido', 'valTotal', 'status', 'acoes'];
    pedidos: Pedido[] = [];
    showEmpty = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private pedidoService: PedidoService) {
    }

    ngOnInit(): void {
        this.pedidoService.findAll()
            .pipe(finalize(() => this.showEmpty = this.pedidos.length === 0))
            .subscribe(value => this.pedidos = value);
    }

    edit(idEmpresa: number): void {
        this.router.navigate([idEmpresa], {relativeTo: this.route});
    }

    alterarStatusPedido(idPedido: number, statusPedido: string): void {
        this.pedidoService.alterarStatusPedido(idPedido, statusPedido)
            .subscribe(() => {
                this.ngOnInit();
            });
    }   




}
