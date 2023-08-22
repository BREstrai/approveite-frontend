import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto } from "./produto.domain";
import { Categoria } from "../categoria/categoria.domain";
import { UnidadeMedida } from "../unidademedida/unidade-medida.domain";

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
    
    findCategoriaAll(): Observable<Categoria[]> {
        return this.http.get(environment.api_url.concat(`/categoria/findAll/`)) as Observable<Categoria[]>;
    }

    findUnMedidaAll(): Observable<UnidadeMedida[]> {
        return this.http.get(environment.api_url.concat(`/unidade-medida/findAll/`)) as Observable<UnidadeMedida[]>;
    }

    save(domain: Produto): Observable<Produto> {
        console.log(domain);
        return this.http.put(this.URL_API.concat('/update'), domain) as Observable<Produto>;
    }

    new(domain: Produto): Observable<Produto> {
        console.log(domain);
        return this.http.post(this.URL_API.concat('/create'), domain) as Observable<Produto>;
    }

}
