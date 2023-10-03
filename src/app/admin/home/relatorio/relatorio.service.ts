import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FiltroGrafico } from './relatorio-dashboard/filtro.domain';
import { CatalogoEmpresa } from "./relatorio-dashboard/catalogo-empresa.domain";
import { DadosCategoriaVendas } from "./relatorio-dashboard/categorias-total.domain";
import { PedidoCompleto } from "../pedido/pedido-completo.domain";

@Injectable()
export class RelatorioService {

	dataInicial: Date;
	dataFinal: Date;
	idCategoria: number;

	private readonly URL_API = environment.api_url;

	constructor(
		private http: HttpClient
	) { }

	getVendasPeriodo(filtro: FiltroGrafico): Observable<DadosCategoriaVendas[]> {

		return this.http.post(this.URL_API.concat('/pedido-detalhe/getVendasPeriodo'), filtro) as Observable<DadosCategoriaVendas[]>;
	}

	public getCategorias(): Observable<CatalogoEmpresa[]> {

		var idEmpresa = localStorage.getItem('idEmpresa');
		return this.http.get(this.URL_API.concat('/categoria/findCategoriasOfEmpresa/'.concat(idEmpresa))) as Observable<CatalogoEmpresa[]>;

	}

	getRelatorio(filtro: FiltroGrafico): Observable<PedidoCompleto[]> {
        return this.http.post(this.URL_API.concat('/pedido-detalhe/getRelatorioPeriodoCategoria'), filtro) as Observable<PedidoCompleto[]>;
    }

	public setFiltro(dataInicial: Date, dataFinal: Date, idCategoria: number) {
		this.dataInicial = new Date(dataInicial);
		this.dataFinal = new Date(dataFinal);
		this.idCategoria = idCategoria;
	}

	public getFiltro(): FiltroGrafico {
		let filtro = new FiltroGrafico();
		filtro.dataInicial = this.dataInicial;
		filtro.dataFinal = this.dataFinal;
		filtro.idCategoria = this.idCategoria;
		return filtro;
	}

}
