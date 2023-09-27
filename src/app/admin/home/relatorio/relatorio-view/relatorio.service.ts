import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class RelatorioService {

    private readonly URL_API = environment.api_url + '/relatorio';

    constructor(private http: HttpClient) {
    }



}
