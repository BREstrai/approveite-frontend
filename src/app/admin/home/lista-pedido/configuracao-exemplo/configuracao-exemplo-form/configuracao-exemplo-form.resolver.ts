import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfiguracaoExemplo} from '../configuracao-exemplo.domain';
import {ConfiguracaoExemploService} from '../configuracao-exemplo.service';

@Injectable()
export class ConfiguracaoExemploFormResolver implements Resolve<ConfiguracaoExemplo> {

    constructor(private configuracaoReciboDigitalService: ConfiguracaoExemploService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConfiguracaoExemplo> {
        return this.configuracaoReciboDigitalService.findOne(route.params.id);
    }

}
