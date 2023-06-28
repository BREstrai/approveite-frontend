import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


const routes: Routes = [
    {
        path: 'lista-pedido',
        loadChildren: () => import('./lista-pedido/lista-pedido.module').then(module => module.ListaPedidoModule)
    },
    {
        path: '',
        redirectTo: 'lista-pedido',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'lista-pedido'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
