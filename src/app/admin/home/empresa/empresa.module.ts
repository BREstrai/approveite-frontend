import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {EmpresaRoutingModule} from './empresa-routing.module';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaService } from './empresa.service';
import { EmpresaFormResolver } from './empresa-form/empresa-form.resolver';

// @ts-ignore
@NgModule({
    declarations: [EmpresaListComponent, EmpresaFormComponent],
    imports: [
        SharedModule,
        EmpresaRoutingModule
    ],
    providers: [
        EmpresaService,
        EmpresaFormResolver
    ]
})
export class EmpresaModule {
}
