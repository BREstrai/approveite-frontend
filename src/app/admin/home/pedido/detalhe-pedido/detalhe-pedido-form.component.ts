import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../shared/services/message.service';
import Decimal from 'decimal.js';

@Component({
    templateUrl: './detalhe-pedido-form.component.html',
    styleUrls: ['./detalhe-pedido-form.component.scss'],
})
export class DetalhePedidoFormComponent implements OnInit {

    detalhePedidoForm: FormGroup;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.detalhePedidoForm = this.fb.group({
            idPedidoDetalhe: [null, Validators.required],
            idPedido: [null, Validators.required],
            idKit: [null, Validators.required],
            idProduto: [null, Validators.required],
            valUnitario: new Decimal(0),
            valDesconto: new Decimal(0),
            qtdItem: new Decimal(0)
        });
        const configuracao = this.route.snapshot.data.configuracao;
        this.detalhePedidoForm.reset(configuracao);
    }

    save(): void {
        this.messageService.show('Detalhes do pedido salvos com sucesso');
    }

    back(): void {
        this.router.navigate(['/admin/configuracao', 'pedido']);
    }

}
