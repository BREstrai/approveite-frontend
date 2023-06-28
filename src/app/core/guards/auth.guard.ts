import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (this.authenticationService.hasToken()) {
            return true;
        } else {
            this.authenticationService.handleLogin(state.url);
            return false;
        }
    }

}
