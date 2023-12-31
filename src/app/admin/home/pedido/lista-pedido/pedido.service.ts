import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "./pedido.domain";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";
import { PedidoCompleto } from "../pedido-completo.domain";

@Injectable()
export class PedidoService {

    private readonly URL_API = environment.api_url + '/pedido';
    private readonly URL_API_DET = environment.api_url + '/pedido-detalhe';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Pedido[]> {
		var idEmpresa = localStorage.getItem('idEmpresa');
        return this.http.get(this.URL_API.concat('/findAllByEmpresa/'.concat(idEmpresa))) as Observable<Pedido[]>;
    }
    
    findDetByPedido(idPedido: number): Observable<PedidoCompleto> {
        return this.http.get(this.URL_API_DET.concat('/findByIdPedido/'+idPedido)) as Observable<PedidoCompleto>;
    }

    findOne(id: number): Observable<Pedido> {

        let mock: Pedido;
        mock = new Pedido();
        mock.idPedido = 1;
        mock.idUsuarioEndereco = 1;
        mock.idEntregador = 1;
        mock.idEmpresa = 1;
        mock.statusPedido = 1;
        mock.idFormaPagamento = 1;
        mock.valTotal = '25.00';
        mock.dataEntrega = new Date();
        mock.dataPedido = new Date();

        const simpleObservable = new Observable<Pedido>((observer) => {
            observer.next(mock);
            observer.complete();
        });
		
        return simpleObservable;
    }

    save(domain: Pedido): Observable<any> {
        return this.http.post<any>(this.URL_API, domain);
    }

    alterarStatusPedido(idPedido: number, statusPedido: string): Observable<any> {
        return this.http.put<any>(this.URL_API.concat('/'+idPedido+'/alteraStatus/'+statusPedido), null);
    }


}
