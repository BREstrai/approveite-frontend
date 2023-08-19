import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PedidoFormComponent } from './detalhe-pedido/pedido-form.component';
import { DetalhePedidoFormResolver } from './detalhe-pedido/detalhe-pedido-form.resolver';
import { PedidoListaComponent } from "./lista-pedido/pedido-list.component";

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
                path: ':idPedido',
                component: PedidoFormComponent,
                resolve: {
                    pedido: DetalhePedidoFormResolver
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
