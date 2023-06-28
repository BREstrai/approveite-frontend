import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ListaPedidoRoutingModule} from './lista-pedido-routing.module';
import {ConfiguracaoExemploListComponent} from './configuracao-exemplo/configuracao-exemplo-list/configuracao-exemplo-list.component';
import {ConfiguracaoExemploFormComponent} from './configuracao-exemplo/configuracao-exemplo-form/configuracao-exemplo-form.component';
import {ConfiguracaoExemploService} from './configuracao-exemplo/configuracao-exemplo.service';
import {ConfiguracaoExemploFormResolver} from './configuracao-exemplo/configuracao-exemplo-form/configuracao-exemplo-form.resolver';

@NgModule({
    declarations: [ConfiguracaoExemploListComponent, ConfiguracaoExemploFormComponent],
    imports: [
        SharedModule,
        ListaPedidoRoutingModule
    ],
    providers: [
        ConfiguracaoExemploService,
        ConfiguracaoExemploFormResolver
    ]
})
export class ListaPedidoModule {
}
