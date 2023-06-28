import {Component, OnInit} from '@angular/core';
import {ConfiguracaoExemploService} from '../configuracao-exemplo.service';
import {ConfiguracaoExemplo} from '../configuracao-exemplo.domain';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
    templateUrl: './configuracao-exemplo-list.component.html',
    styleUrls: ['./configuracao-exemplo-list.component.scss']
})
export class ConfiguracaoExemploListComponent implements OnInit {

    displayedColumns: string[] = ['empresa', 'fgReciboDigital', 'opcoes'];
    configuracoes: ConfiguracaoExemplo[] = [];
    showEmpty = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private reciboDigitalService: ConfiguracaoExemploService) {
    }

    ngOnInit(): void {
        this.reciboDigitalService.findAll()
            .pipe(finalize(() => this.showEmpty = this.configuracoes.length === 0))
            .subscribe(value => this.configuracoes = value);
    }

    edit(idEmpresa: number): void {
        this.router.navigate([idEmpresa], {relativeTo: this.route});
    }

}
