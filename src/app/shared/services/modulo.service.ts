import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ModuloService {

    private readonly URL_API = environment.api_url + '/modulo';

    constructor(private http: HttpClient) {
    }

}
