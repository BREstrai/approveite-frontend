import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Empresa} from './empresa.domain';

@Injectable()
export class EmpresaService {

    private readonly URL_API = environment.api_url.concat('/empresa');

    constructor(private http: HttpClient) {
    }

    findOne(id: number): Observable<Empresa> {
        return this.http.get(`${this.URL_API}/findById/${id}`) as Observable<Empresa>;
      }

    save(domain: Empresa): Observable<Empresa> {
        return this.http.put(this.URL_API.concat('/update') , domain) as Observable<Empresa>;
    }

}
