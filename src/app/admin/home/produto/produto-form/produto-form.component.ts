import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../shared/services/message.service';

@Component({
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {

    produtoForm: FormGroup;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
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
    }

    save(): void {
        this.messageService.show('Produtos salvos com sucesso');
    }

    back(): void {
        this.router.navigate(['/admin/produto', 'produto']);
    }

}
