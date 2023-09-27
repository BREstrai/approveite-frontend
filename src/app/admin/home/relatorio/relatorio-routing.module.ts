import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio-view/relatorio.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RelatorioComponent
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class RelatorioRoutingModule {
}
