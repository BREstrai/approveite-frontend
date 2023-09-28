import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio-view/relatorio.component';
import { RelatorioDashboardComponent } from './relatorio-dashboard/relatorio-dashborad.component';

const routes: Routes = [
    {
        path: 'relatorio',
        pathMatch: 'full',
        component: RelatorioComponent
    },
	{
		path: 'dashboard',
		component: RelatorioDashboardComponent
	}
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class RelatorioRoutingModule {
}
