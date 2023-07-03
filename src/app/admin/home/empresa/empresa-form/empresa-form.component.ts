import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../../shared/services/message.service';
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
                private empresaServie: EmpresaService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.empresaForm = this.fb.group({
            idEmpresa: [null, Validators.required],
            dsEmpresa: [null]
        });
        const empresa = this.route.snapshot.data.empresa;
        this.empresaForm.reset(empresa);
        this.empresaForm.controls.dsEmpresa.setValue(`${empresa.idEmpresa} - ${empresa.dsEmpresa}`);
        this.empresaForm.controls.dsEmpresa.disable();
    }

    save(): void {
        this.empresaServie.save(this.empresaForm.value)
            .subscribe(() => {
                this.messageService.show('Empresa salva com sucesso');
                this.back();
            }, error => this.messageService.show(error.error.message));
    }

    back(): void {
        this.router.navigate(['/admin/empresa', 'empresa']);
    }

}
