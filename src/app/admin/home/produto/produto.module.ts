import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProdutoRoutingModule} from './produto-routing.module';
import { ProdutoFormResolver } from './produto-form/produto-form.resolver';
import { ProdutoService } from './produto.service';
import { ProdutoListComponent } from './produto-lista/produto-list.component';

@NgModule({
    declarations: [ProdutoListComponent],
    imports: [
        SharedModule,
        ProdutoRoutingModule
    ],
    providers: [
        ProdutoFormResolver,
        ProdutoService
    ]
})
export class ProdutoModule {
}
