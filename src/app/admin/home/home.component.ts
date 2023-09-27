import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ModuloService } from '../../shared/services/modulo.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	private routerEvents: Subscription;

	constructor(private authenticationService: AuthenticationService) {
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		if (!!this.routerEvents) {
			this.routerEvents.unsubscribe();
		}
	}

	logOut(): void {
		this.authenticationService.removeToken();
		this.authenticationService.handleLogin();
	}
}
