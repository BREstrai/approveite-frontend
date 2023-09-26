import { Component, OnInit, NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { ProdutoService } from '../produto.service';
import { UnidadeMedida } from '../../unidademedida/unidade-medida.domain';
import { Categoria } from '../../categoria/categoria.domain';
import { Produto } from '../produto.domain';
import { Tags } from '../../tag/tag.domain';

@Component({
    templateUrl: './produto-form.component.html',
    styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent implements OnInit {

    tagValue: string;
    produtoForm: FormGroup;
    imagemURL: string;
    categorias: Categoria[];
    tiposUnMedidas: UnidadeMedida[];
    selectedFile: File | null = null;
    selectedFileBase64: string | null = null;
    tags: Tags[] = [];
    displayedColumns: string[] = ['idTag', 'dsTag', 'delete'];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private produtoService: ProdutoService,
        private messageService: MessageService,
        private ngZone: NgZone
        ) {
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
            img: [Validators.required],
        });

        this.loadCategorias();
        this.loadTiposUnMedida();

        const produto = this.route.snapshot.data.produto;
        if (produto) {
            this.produtoForm.reset(produto);
            this.selectedFile = new File([this.dataURItoBlob(produto.img)], 'filename.jpg', { type: 'image/jpeg', lastModified: Date.now() });
            this.produtoForm.get('idCategoria').setValue(produto.idCategoria);
            this.produtoForm.get('idTipoUnMedida').setValue(produto.idTipoUnMedida);
            this.tags = produto.tags;

            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                this.selectedFileBase64 = event.target.result as string;
            };
            fileReader.readAsDataURL(this.selectedFile);
        }
    }

    newTag(): void {
        const tag: Tags = {
            idTag: null,
            idProduto: this.produtoForm.get('idProduto').value,
            dsTag: this.tagValue,
        };

        this.produtoService.newTag(tag).subscribe(
            (response: Tags) => {
                this.messageService.show('Tag ' + response.dsTag + ' adicionada com sucesso');
                window.location.reload();
            }
        );
    }

    dataURItoBlob(dataURI: string): Blob {
        const byteString = atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: 'image/jpeg' }); // Adjust the MIME type as needed
    }

    onFileSelected(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            this.selectedFile = inputElement.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                this.selectedFileBase64 = reader.result as string
            };
            reader.readAsDataURL(this.selectedFile);
        } else {
            this.selectedFile = null;
            this.selectedFileBase64 = null;
        }
    }

    loadCategorias(): void {
        this.produtoService.findCategoriaAll().subscribe((categorias: Categoria[]) => {
            this.categorias = categorias;
        });
    }

    loadTiposUnMedida(): void {
        this.produtoService.findUnMedidaAll().subscribe((tiposUnMedida: UnidadeMedida[]) => {
            this.tiposUnMedidas = tiposUnMedida;
        });
    }

    save(): void {
        if (!this.selectedFile) {
            this.messageService.show("Nenhuma imagem selecionada");
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
                status: this.produtoForm.get('status')?.value ? true : false,
                idEmpresa: parseInt(localStorage.getItem('idEmpresa')),
                img: imagemURL,
                tags: this.tags,
            };

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

    delete(tag: Tags): void {
        const productId = this.produtoForm.get('idProduto').value;
        console.log(productId);
        
        this.produtoService.deleteTag(tag.idTag).subscribe(
            (response: Tags[]) => {
                this.tags = response;
            }
        );
    }

    back(): void {
        this.router.navigate(['/admin/produto', 'produto']);
    }

    novo(): void {
        this.produtoForm.reset();
        this.imagemURL = null;
        this.selectedFile = null
        this.selectedFileBase64 = null;
    }

}
