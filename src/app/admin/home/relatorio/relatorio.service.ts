import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FiltroGrafico } from './relatorio-dashboard/filtro.domain';
import { CatalogoEmpresa } from "./relatorio-dashboard/catalogo-empresa.domain";
import { DadosCategoriaVendas } from "./relatorio-dashboard/categorias-total.domain";

@Injectable()
export class RelatorioService {

	private readonly URL_API = environment.api_url;

	constructor(
		private http: HttpClient
	) { }

	getVendasPeriodo(filtro: FiltroGrafico): Observable<DadosCategoriaVendas[]> {

		return this.http.post(this.URL_API.concat('/pedido-detalhe/getVendasPeriodo'), filtro) as Observable<import("./relatorio-dashboard/categorias-total.domain").DadosCategoriaVendas[]>;
	}

	public getCategorias(): Observable<CatalogoEmpresa[]> {

		var idEmpresa = localStorage.getItem('idEmpresa');
		return this.http.get(this.URL_API.concat('/categoria/findCategoriasOfEmpresa/'.concat(idEmpresa))) as Observable<CatalogoEmpresa[]>;

	}

}
