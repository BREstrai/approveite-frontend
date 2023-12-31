import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './guards/auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {HttpTokenInterceptor} from './interceptors/http.token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
        AuthGuard,
        AuthenticationService
    ]
})
export class CoreModule {
}
