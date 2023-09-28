import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioService } from './relatorio.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { RelatorioComponent } from './relatorio-view/relatorio.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RelatorioDashboardComponent } from './relatorio-dashboard/relatorio-dashborad.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [RelatorioComponent, RelatorioDashboardComponent],
    imports: [
        SharedModule,
        RelatorioRoutingModule,
        MatExpansionModule, 
		MatDialogModule,
		MatSelectModule,
		MatDatepickerModule,
        FormsModule,
		MatInputModule,
		MatNativeDateModule,
		MatButtonModule,
		CommonModule,
    ],
    providers: [
        RelatorioService
    ]
})
export class RelatorioModule {
}
