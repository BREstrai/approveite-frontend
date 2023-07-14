import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import { Produto } from '../produto.domain';
import { ProdutoService } from '../produto.service';

@Component({
    templateUrl: './produto-list.component.html',
    styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

    displayedColumns: string[] = ['idProduto', 'descricao', 'idProdutoExterno', 'qtdDisponivel', 'valorUn', 'acoes'];
    produtos: Produto[] = [];
    showEmpty = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private produtoService: ProdutoService) {
    }

    ngOnInit(): void {
        this.produtoService.findAll(1)
            .pipe(finalize(() => this.showEmpty = this.produtos.length === 0))
            .subscribe(value => this.produtos = value);
    }

    edit(produto: Produto): void {
        this.router.navigate(['./', produto.idProduto], {relativeTo: this.route});
    }

}
