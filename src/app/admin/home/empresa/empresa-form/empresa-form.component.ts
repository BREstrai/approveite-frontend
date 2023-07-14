import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';
import { EmpresaService } from '../empresa.service';

@Component({
    templateUrl: './empresa-form.component.html',
    styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

    empresaForm: FormGroup;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private empresaService: EmpresaService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.empresaForm = this.fb.group({
            idEmpresa: [null, Validators.required],
            complemento: [null, Validators.required],
            cnpj: [null, Validators.required],
            cep: [null, Validators.required],
            numero: [null, Validators.required],
            logradouro: [null, Validators.required],
            bairro: [null, Validators.required],
            descricao: [null, Validators.required],
            fone1: [null, Validators.required],
            fone2: [null, Validators.required],
            hrAbre: [null, Validators.required],
            hrFecha: [null, Validators.required],
            status: [null, Validators.required],
            taxaEntrega: [null, Validators.required],
        });

        const empresa = this.route.snapshot.data.empresa;
        console.log(empresa);
        if (empresa) {
            this.empresaForm.reset(empresa);
        }

    }

    save(): void {
        this.empresaService.save(this.empresaForm.value)
            .subscribe(() => {
                this.messageService.show('Empresa salva com sucesso');
                this.back();
            }, error => this.messageService.show(error.error.message));
    }

    back(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}
