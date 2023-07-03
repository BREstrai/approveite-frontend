import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Empresa} from './empresa.domain';

@Injectable()
export class EmpresaService {

    private readonly URL_API = environment.api_url + '/configuracao/recibo/digital';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Empresa[]> {
        // mock exemplo
        let mock: Empresa;
        let mockList: Empresa[];
        mockList = [];
        mock = new  Empresa ();
        mock.dsEmpresa = 'Empresa Mock';
        mock.idEmpresa = 1;

        mockList.push(mock);

        const simpleObservable = new Observable<Empresa[]>((observer) => {
            observer.next(mockList);
            observer.complete();
        });
        // return this.http.get<ConfiguracaoExemplo[]>(this.URL_API);
        return simpleObservable;
    }

    findOne(id: number): Observable<Empresa> {

        // mock de exemplo
        let mock: Empresa;
        mock = new  Empresa();
        mock.dsEmpresa = 'Empresa Mock';
        mock.idEmpresa = 1;

        const simpleObservable = new Observable<Empresa>((observer) => {
            observer.next(mock);
            observer.complete();
        });
        // return this.http.get<ConfiguracaoExemplo>(`${this.URL_API}/${id}`);
        return simpleObservable;
    }

    save(domain: Empresa): Observable<any> {
        return this.http.post<any>(this.URL_API, domain);
    }

}
