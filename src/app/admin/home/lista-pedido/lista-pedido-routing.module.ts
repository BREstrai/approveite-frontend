import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfiguracaoExemploListComponent} from './configuracao-exemplo/configuracao-exemplo-list/configuracao-exemplo-list.component';
import {ConfiguracaoExemploFormComponent} from './configuracao-exemplo/configuracao-exemplo-form/configuracao-exemplo-form.component';
import {ConfiguracaoExemploFormResolver} from './configuracao-exemplo/configuracao-exemplo-form/configuracao-exemplo-form.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'configuracao-exemplo-rota'
    },
    {
        path: 'configuracao-exemplo-rota',
        children: [
            {
                path: '',
                component: ConfiguracaoExemploListComponent
            },
            {
                path: ':id',
                component: ConfiguracaoExemploFormComponent,
                resolve: {
                    configuracao: ConfiguracaoExemploFormResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class ListaPedidoRoutingModule {
}
