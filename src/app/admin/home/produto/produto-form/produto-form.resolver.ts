import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Produto } from '../produto.domain';
import { ProdutoService } from '../produto.service';

@Injectable()
export class ProdutoFormResolver implements Resolve<Produto> {

    constructor(private produtoService: ProdutoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
        return this.produtoService.findOne(route.params.idProduto);
    }
}
