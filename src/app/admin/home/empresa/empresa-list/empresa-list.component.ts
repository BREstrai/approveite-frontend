import {Component, OnInit} from '@angular/core';
import {EmpresaService} from '../empresa.service';
import {Empresa} from '../empresa.domain';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
    templateUrl: './empresa-list.component.html',
    styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

    displayedColumns: string[] = ['empresa', 'opcoes'];
    empresas: Empresa[] = [];
    showEmpty = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        this.empresaService.findAll()
            .pipe(finalize(() => this.showEmpty = this.empresas.length === 0))
            .subscribe(value => this.empresas = value);
    }

    edit(idEmpresa: number): void {
        this.router.navigate([idEmpresa], {relativeTo: this.route});
    }

}
