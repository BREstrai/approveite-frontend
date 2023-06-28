import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {LoginRountingModule} from './login-rounting.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        SharedModule,
        LoginRountingModule,
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {
}
