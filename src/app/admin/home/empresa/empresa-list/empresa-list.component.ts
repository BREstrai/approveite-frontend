import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../empresa.service';
import { Empresa } from '../empresa.domain';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './empresa-list.component.html',
    styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {

    displayedColumns: string[] = ['empresa', 'cnpj', 'opcoes'];
    empresas: Empresa[] = [];
    idEmpresa: number;
    showEmpty = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private empresaService: EmpresaService) {
    }

    ngOnInit(): void {
        this.idEmpresa = +localStorage.getItem('idEmpresa');

        this.empresaService.findOne(this.idEmpresa).subscribe(empresa => {
            this.empresas = [empresa];
        });
    }

    edit(empresa: Empresa): void {
        this.router.navigate(['./', empresa.idEmpresa], { relativeTo: this.route });
    }

}
