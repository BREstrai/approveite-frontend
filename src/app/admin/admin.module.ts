import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';
import {LoginModule} from './login/login.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
    ],
    imports: [
        AdminRoutingModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        LoginModule,
    ],
    providers: [],
    bootstrap: []
})
export class AdminModule {
}
