import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { ProdutoService } from '../produto.service';
import { UnidadeMedida } from '../../unidademedida/unidade-medida.domain';
import { Categoria } from '../../categoria/categoria.domain';
import { Produto } from '../produto.domain';

@Component({
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {

    produtoForm: FormGroup;
    imagemURL: string;
    categorias: Categoria[];
    tiposUnMedidas: UnidadeMedida[];
    selectedFile: File | null = null;
    selectedFileBase64: string | null = null;

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

    onFileSelected(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            this.selectedFile = inputElement.files[0];
    
            const reader = new FileReader();
            reader.onload = () => {
                this.selectedFileBase64 = reader.result as string;
            };
            reader.readAsDataURL(this.selectedFile);
        } else {
            this.selectedFile = null;
            this.selectedFileBase64 = null;
        }
    }
    

    // onFileSelected(event: Event): void {
    //     const inputElement = event.target as HTMLInputElement;
    //     if (inputElement.files && inputElement.files.length > 0) {
    //         this.selectedFile = inputElement.files[0];
    //     } else {
    //         this.selectedFile = null;
    //     }
    // }
    

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
        if (!this.selectedFile) {
            console.log("Nenhum arquivo selecionado.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const imagemURL = reader.result as string;

            const produto: Produto = {
                idProduto: this.produtoForm.get('idProduto').value,
                descricao: this.produtoForm.get('descricao').value,
                idProdutoExterno: this.produtoForm.get('idProdutoExterno').value,
                qtdDisponivel: this.produtoForm.get('qtdDisponivel').value,
                valorUn: this.produtoForm.get('valorUn').value,
                idCategoria: this.produtoForm.get('idCategoria').value,
                idTipoUnMedida: this.produtoForm.get('idTipoUnMedida').value,
                status: this.produtoForm.get('status').value,
                idEmpresa: parseInt(localStorage.getItem('idEmpresa')),
                img: imagemURL,
            };

            // Use o serviço de produtos para enviar o objeto Produto para o servidor
            if (this.produtoForm.get('idProduto').value == null) {
                this.produtoService.new(produto).subscribe(
                    () => {
                        this.messageService.show('Produto salvo com sucesso');
                        this.back();
                    },
                    error => this.messageService.show(error.error.message)
                );
            } else {
                this.produtoService.save(produto).subscribe(
                    () => {
                        this.messageService.show('Produto salvo com sucesso');
                        this.back();
                    },
                    error => this.messageService.show(error.error.message)
                );
            }
        };

        reader.readAsDataURL(this.selectedFile);
    }



    back(): void {
        this.router.navigate(['/admin/produto', 'produto']);
    }

    novo(): void {
        this.produtoForm.reset();
        this.imagemURL = null;
    }


}
