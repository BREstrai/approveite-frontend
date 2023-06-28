import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfiguracaoExemploService} from '../configuracao-exemplo.service';
import {MessageService} from '../../../../../shared/services/message.service';

@Component({
    templateUrl: './configuracao-exemplo-form.component.html',
    styleUrls: ['./configuracao-exemplo-form.component.scss']
})
export class ConfiguracaoExemploFormComponent implements OnInit {

    configuracaoForm: FormGroup;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private configuracaoReciboDigitalService: ConfiguracaoExemploService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.configuracaoForm = this.fb.group({
            idEmpresa: [null, Validators.required],
            fgReciboDigital: [null, Validators.required],
            dsEmpresa: [null]
        });
        const configuracao = this.route.snapshot.data.configuracao;
        this.configuracaoForm.reset(configuracao);
        this.configuracaoForm.controls.dsEmpresa.setValue(`${configuracao.idEmpresa} - ${configuracao.dsEmpresa}`);
        this.configuracaoForm.controls.dsEmpresa.disable();
    }

    save(): void {
        this.configuracaoReciboDigitalService.save(this.configuracaoForm.value)
            .subscribe(() => {
                this.messageService.show('Configuração salva com sucesso');
                this.back();
            }, error => this.messageService.show(error.error.message));
    }

    back(): void {
        this.router.navigate(['/admin/configuracao', 'configuracao-exemplo-rota']);
    }

}
