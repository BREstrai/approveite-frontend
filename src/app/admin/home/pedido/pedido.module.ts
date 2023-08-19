import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoFormComponent } from './detalhe-pedido/pedido-form.component';
import { PedidoService } from './lista-pedido/pedido.service';
import { DetalhePedidoFormResolver } from './detalhe-pedido/detalhe-pedido-form.resolver';
import { PedidoListaComponent } from './lista-pedido/pedido-list.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [PedidoFormComponent, PedidoListaComponent],
    imports: [
        SharedModule,
        PedidoRoutingModule,
        MatExpansionModule
    ],
    providers: [
        DetalhePedidoFormResolver,
        PedidoService
    ]
})
export class PedidoModule {
}
