import {Injectable} from '@angular/core';
import decode from 'jwt-decode';
import {Router} from '@angular/router';

/*
    TODO
    Ajustar para o Key correto do Projeto
 */
const KEY = 'authTokenTemplate';

@Injectable()
export class AuthenticationService {

    constructor(private router: Router) {
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(token): void {
        window.localStorage.setItem(KEY, token);
    }

    getToken(): string {
        return window.localStorage.getItem(KEY);
    }

    removeToken(): void {
        window.localStorage.removeItem(KEY);
    }

    hasAuthority(role: string): boolean {
        const decodedToken = decode(this.getToken());
        return decodedToken.roles.includes(role);
    }

    handleLogin(path?: string): void {
        let extras;
        if (!!path) {
            extras = {queryParams: {path}};
        }
        this.router.navigate(['admin/login'], extras);
    }

}
