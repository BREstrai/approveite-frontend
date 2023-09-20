import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoFormResolver } from './produto-form/produto-form.resolver';
import { ProdutoListComponent } from './produto-lista/produto-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'produto'
    },
    {
        path: 'produto',
        children: [
            {
                path: '',
                component: ProdutoListComponent
            },
            {
                path: ':idProduto',
                component: ProdutoFormComponent,
                resolve: {
                    produto: ProdutoFormResolver
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class ProdutoRoutingModule {
}
