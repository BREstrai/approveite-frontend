import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../shared/services/message.service';
import {tap} from 'rxjs/operators';
import {LoadingService} from '../../shared/services/loading.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private readonly ROLE_ADMIN = 'ROLE_ADMIN';

    loginForm: FormGroup;
    navigateTo: string;

    constructor(private fb: FormBuilder,
                private loginService: LoginService,
                private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private messageService: MessageService,
                private loading: LoadingService) {
    }

    ngOnInit(): void {
        this.navigateTo = this.route.snapshot.queryParams.path || '/';
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    logOn(): void {
        if (this.loginForm.invalid) {
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.get(key).markAsDirty();
            });
            return;
        }
        this.loading.start('Carregando');

        this.loginService.logOn(this.loginForm.value).pipe(tap(res => {
            const authToken = res.headers.get('Authorization');
            this.authenticationService.setToken(authToken);
        })).subscribe(value => {
            this.loading.done();
            this.router.navigate([this.navigateTo]);
        }, error => {
            this.loading.done();
            if (error.status === 400 || error.status === 401) {
                this.messageService.show('Usuário e/ou senha inválidos');
            } else {
                this.messageService.show('Falha no servidor');
            }
        });
    }

}
