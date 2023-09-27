import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioService } from './relatorio-view/relatorio.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { RelatorioComponent } from './relatorio-view/relatorio.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [RelatorioComponent],
    imports: [
        SharedModule,
        RelatorioRoutingModule,
        MatExpansionModule, 
		MatDialogModule,
    ],
    providers: [
        RelatorioService
    ]
})
export class RelatorioModule {
}
