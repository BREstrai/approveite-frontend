import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../shared/services/message.service';
import { ProdutoService } from '../produto.service';

@Component({
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {

    produtoForm: FormGroup;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private produtoService: ProdutoService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.produtoForm = this.fb.group({
            idProduto: [null, Validators.required],
            descricao: [null, Validators.required],
            idProdutoExterno: [null, Validators.required],
            status: [null, Validators.required],
            idEmpresa: [null, Validators.required],
            idCategoria: [null, Validators.required],
            idTipoUnMedida: [null, Validators.required],
            qtdDisponivel: [null, Validators.required],
            valorUn: [null, Validators.required],
            img: [null, Validators.required],
        });

        const produto = this.route.snapshot.data.produto;
        console.log(produto);
        if (produto) {
            this.produtoForm.reset(produto);
        }
    }

    save(): void {
        this.produtoService.save(this.produtoForm.value)
        .subscribe(() => {
            this.messageService.show('Produto salvo com sucesso');
            this.back();
        }, error => this.messageService.show(error.error.message));
    }

    back(): void {
        this.router.navigate(['/admin/produto', 'produto']);
    }

}
