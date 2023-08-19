import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { PedidoCompleto } from '../pedido-completo.domain';
import { Pedido } from '../lista-pedido/pedido.domain';
import { DetalhePedido } from './detalhe-pedido.domain';
import { PedidoService } from '../lista-pedido/pedido.service';

@Component({
    selector: 'app-detalhe-pedido-form',
    templateUrl: './detalhe-pedido-form.component.html',
    styleUrls: ['./detalhe-pedido-form.component.scss'],
})
export class PedidoFormComponent implements OnInit {

    pedidoForm: FormGroup;
    displayProd = ["idProduto", "descricaoProduto", "qtdItem", "valUnitario", "valDesconto"];
    detalhesPedido: DetalhePedido[] = [];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private pedidoService: PedidoService) {
    }

    ngOnInit(): void {
        this.pedidoForm = this.fb.group({
            idPedido: [null, Validators.required],
            idEmpresa: [null, Validators.required],
            dsCliente: [null, Validators.required],
            idUsuarioEndereco: [null, Validators.required],
            dsEndereco: [null, Validators.required],
            idFormaPagamento: [null, Validators.required],
            dsFormaPagamento: [null, Validators.required],
            statusPedido: [null, Validators.required],
            idEntregador: [null, Validators.required],
            valTotal: [null, Validators.required],
            dataPedido: [null, Validators.required],
            dataEntrega: [null, Validators.required],
        });


        this.route.data.subscribe((data: { pedido: PedidoCompleto }) => {
            const pedidoCompleto: PedidoCompleto = data.pedido;

            const pedido: Pedido = pedidoCompleto.pedido;
            const detalhePedido: DetalhePedido[] = pedidoCompleto.pedidoDetalhe;

            console.log("Pedido:", pedido);
            this.detalhesPedido = detalhePedido;
            this.pedidoForm.patchValue(pedido);

        });
    }

    alterarStatusPedido(statusPedido: string): void {

        const idPedido = this.pedidoForm.get('idPedido')?.value;

        this.pedidoService.alterarStatusPedido(idPedido, statusPedido).subscribe(
            () => {
                
                this.router.navigate(['/admin/pedido', 'pedido']);
            },
            (error) => {            
                this.messageService.show('Erro ao alterar status do pedido!');
            }
        );
        
    }

    back(): void {
        this.router.navigate(['/admin/pedido', 'pedido']);
    }

}
