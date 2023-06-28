import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.hasToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.getToken()}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => {}, err => {
            if (!err.url.endsWith('/login') && (err.status === 401 || err.status === 403)) {
                this.authenticationService.removeToken();
                this.authenticationService.handleLogin();
            }
        }));
    }

}
