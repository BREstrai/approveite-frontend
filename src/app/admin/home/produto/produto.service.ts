import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Produto } from "./produto.domain";

@Injectable()
export class ProdutoService {

    private readonly URL_API = environment.api_url + '/produto';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Produto[]> {
        return this.http.get(this.URL_API.concat('/findAllProdutos')) as Observable<Produto[]>;
    }

    findOne(id: number): Observable<Produto> {
        return this.http.get(this.URL_API.concat('/produtoById/'+id)) as Observable<Produto>;
    }

    save(domain: Produto): Observable<any> {
        return this.http.post<any>(this.URL_API, domain);
    }

}
