import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { DetalhePedido } from './detalhe-pedido.domain';
import { PedidoService } from '../lista-pedido/pedido.service';

@Component({
    selector: 'app-detalhe-pedido-form',
    templateUrl: './detalhe-pedido-form.component.html',
    styleUrls: ['./detalhe-pedido-form.component.scss'],
})
export class DetalhePedidoFormComponent implements OnInit {

    detalhePedidoForm: FormGroup;
    dysplayProd = ["idProduto", "descricaoProduto", "qtdItem", "valUnitario", "valDesconto"];
    listaProd: DetalhePedido[] = [];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private pedidoService: PedidoService) {
    }

    ngOnInit(): void {
        this.detalhePedidoForm = this.fb.group({
            idPedidoDetalhe: [null, Validators.required],
            idPedido: [null, Validators.required],
            descricaoProduto: [null, Validators.required],
            idKit: [null, Validators.required],
            idProduto: [null, Validators.required],
            valUnitario: [null, Validators.required],
            valDesconto: [null, Validators.required],
            qtdItem: [null, Validators.required],
        });
        
        // const data = this.route.snapshot.data;
        // console.log(data.pedido.length);
        // this.listaProd = [data.pedido] as DetalhePedido[];
        // console.log(this.listaProd[0]);
        this.route.data.subscribe((data: { pedido: DetalhePedido[] }) => {
            this.listaProd = data.pedido;
            console.log(this.listaProd); // Mostra a lista de detalhes de pedido no console
        });
    }

    save(): void {
        this.messageService.show('Detalhes do pedido salvos com sucesso');
    }

    back(): void {
        this.router.navigate(['/admin/configuracao', 'pedido']);
    }

}
