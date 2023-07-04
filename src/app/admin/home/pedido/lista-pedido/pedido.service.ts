import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "./pedido.domain";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class PedidoService {

    private readonly URL_API = environment.api_url + '/pedido';

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Pedido[]> {
        return this.http.get(this.URL_API.concat('/findAllPedidos')) as Observable<Pedido[]>;
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
        return this.http.put<any>(this.URL_API.concat('/'+idPedido+'/'+statusPedido), null);
    }


}
