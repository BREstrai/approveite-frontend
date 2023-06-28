import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
        loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
