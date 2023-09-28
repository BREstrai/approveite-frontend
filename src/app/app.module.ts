import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CoreModule,
		SharedModule.forRoot(),
		RouterModule,
		MatNativeDateModule,
		ChartsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
