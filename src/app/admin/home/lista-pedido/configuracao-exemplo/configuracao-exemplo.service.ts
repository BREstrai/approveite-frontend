import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfiguracaoExemplo} from './configuracao-exemplo.domain';

@Injectable()
export class ConfiguracaoExemploService {

    private readonly URL_API = environment.api_url + '/configuracao/recibo/digital';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<ConfiguracaoExemplo[]> {
        // mock exemplo
        let mock: ConfiguracaoExemplo;
        let mockList: ConfiguracaoExemplo[];
        mockList = [];
        mock = new  ConfiguracaoExemplo ();
        mock.dsEmpresa = 'Empresa Mock';
        mock.fgReciboDigital = false;
        mock.idEmpresa = 1;

        mockList.push(mock);

        const simpleObservable = new Observable<ConfiguracaoExemplo[]>((observer) => {
            observer.next(mockList);
            observer.complete();
        });
        // return this.http.get<ConfiguracaoExemplo[]>(this.URL_API);
        return simpleObservable;
    }

    findOne(id: number): Observable<ConfiguracaoExemplo> {

        // mock de exemplo
        let mock: ConfiguracaoExemplo;
        mock = new  ConfiguracaoExemplo ();
        mock.dsEmpresa = 'Empresa Mock';
        mock.fgReciboDigital = false;
        mock.idEmpresa = 1;

        const simpleObservable = new Observable<ConfiguracaoExemplo>((observer) => {
            observer.next(mock);
            observer.complete();
        });
        // return this.http.get<ConfiguracaoExemplo>(`${this.URL_API}/${id}`);
        return simpleObservable;
    }

    save(domain: ConfiguracaoExemplo): Observable<any> {
        return this.http.post<any>(this.URL_API, domain);
    }

}
