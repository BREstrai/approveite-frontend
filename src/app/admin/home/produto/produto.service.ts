import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "./produto.domain";

@Injectable()
export class ProdutoService {

    private readonly URL_API = environment.api_url + '/produto';

    constructor(private http: HttpClient) {
    }

    findAll(idEmpresa: number): Observable<Produto[]> {

        return this.http.get(this.URL_API.concat(`/findAll/byEmpresa/${idEmpresa}`)) as Observable<Produto[]>;

    }

    findOne(idProduto: number): Observable<Produto> {
        return this.http.get(this.URL_API.concat(`/findById/${idProduto}`)) as Observable<Produto>;
    }

    save(domain: Produto): Observable<Produto> {
        console.log(domain);
        return this.http.put(this.URL_API.concat('/update'), domain) as Observable<Produto>;
    }

}
