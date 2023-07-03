import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {DetalhePedidoFormComponent} from './detalhe-pedido/detalhe-pedido-form.component';
import {DetalhePedidoFormResolver} from './detalhe-pedido/detalhe-pedido-form.resolver';
import {PedidoListaComponent} from "./lista-pedido/pedido-list.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pedido'
    },
    {
        path: 'pedido',
        children: [
            {
                path: '',
                component: PedidoListaComponent
            },
            {
                path: ':id',
                component: DetalhePedidoFormComponent,
                resolve: {
                    configuracao: DetalhePedidoFormResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class PedidoRoutingModule {
}
