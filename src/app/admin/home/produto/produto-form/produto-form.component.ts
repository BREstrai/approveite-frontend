import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { ProdutoService } from '../produto.service';
import { UnidadeMedida } from '../../unidademedida/unidade-medida.domain';
import { Categoria } from '../../categoria/categoria.domain';

@Component({
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {

    produtoForm: FormGroup;
    imagemURL: string;
    categorias: Categoria[];
    tiposUnMedidas: UnidadeMedida[];

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

        this.loadCategorias();
        this.loadTiposUnMedida();

        const produto = this.route.snapshot.data.produto;
        if (produto) {
            this.produtoForm.reset(produto);
            this.imagemURL = produto.img;
            this.produtoForm.get('idCategoria').setValue(produto.idCategoria);
            this.produtoForm.get('idTipoUnMedida').setValue(produto.idTipoUnMedida);
        }
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.imagemURL = reader.result as string;
                this.imagemURL = this.imagemURL.replace('data:image/jpeg;base64,', '');
            };

            reader.readAsDataURL(file);
        }
    }

    loadCategorias(): void {
        this.produtoService.findCategoriaAll().subscribe((categorias: Categoria[]) => {
            this.categorias = categorias;
            console.log(this.categorias);
        });
    }

    loadTiposUnMedida(): void {
        this.produtoService.findUnMedidaAll().subscribe((tiposUnMedida: UnidadeMedida[]) => {
            this.tiposUnMedidas = tiposUnMedida;
            console.log(this.tiposUnMedidas);
        });
    }

    save(): void {

        if (this.imagemURL) {
            this.produtoForm.get('img').setValue(this.imagemURL);
        }

        this.produtoService.save(this.produtoForm.value).subscribe(
            () => {
                this.messageService.show('Produto salvo com sucesso');
                this.back();
            },
            error => this.messageService.show(error.error.message)
        );
    }

    back(): void {
        this.router.navigate(['/admin/produto', 'produto']);
    }

}
