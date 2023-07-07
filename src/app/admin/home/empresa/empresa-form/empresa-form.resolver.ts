import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Empresa} from '../empresa.domain';
import {EmpresaService} from '../empresa.service';

@Injectable()
export class EmpresaFormResolver implements Resolve<Empresa> {

    constructor(private empresaService: EmpresaService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa> {
        return this.empresaService.findOne(route.params.idEmpresa);
    }

}
