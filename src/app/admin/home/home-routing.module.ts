import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(module => module.EmpresaModule)
    },
    {
        path: 'pedido',
        loadChildren: () => import('./pedido/pedido.module').then(module => module.PedidoModule)
    },
    {
        path: 'produto',
        loadChildren: () => import('./produto/produto.module').then(module => module.ProdutoModule)
    },
	{
        path: 'relatorio',
        loadChildren: () => import('./relatorio/relatorio.module').then(module => module.RelatorioModule)
    },
    {
        path: '',
        redirectTo: 'relatorio',
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
