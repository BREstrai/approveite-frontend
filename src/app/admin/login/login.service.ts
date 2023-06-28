import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Login} from './login.domain';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {

    private readonly URL_API = environment.api_url.concat('/login');

    constructor(private http: HttpClient) {
    }

    logOn(login: Login): Observable<any> {
        return this.http.post(this.URL_API, login, { observe: 'response' });
    }

}
