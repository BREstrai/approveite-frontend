import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoFormResolver } from './produto-form/produto-form.resolver';
import { ProdutoService } from './produto.service';
import { ProdutoListComponent } from './produto-lista/produto-list.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
    declarations: [ProdutoListComponent, ProdutoFormComponent],
    imports: [
        SharedModule,
        ProdutoRoutingModule
    ],
    providers: [
        ProdutoService,
        ProdutoFormResolver
    ]
})
export class ProdutoModule {
}
