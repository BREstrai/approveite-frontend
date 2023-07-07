import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaFormResolver } from './empresa-form/empresa-form.resolver';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'empresa'
    },
    {
        path: 'empresa',
        children: [
            {
                path: '',
                component: EmpresaListComponent
            },
            {
                path: ':idEmpresa',
                component: EmpresaFormComponent,
                resolve: {
                    empresa: EmpresaFormResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class EmpresaRoutingModule {
}
