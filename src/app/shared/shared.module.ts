import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input/input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MessageService} from './services/message.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppInfoComponent} from './components/app-info/app-info.component';
import {AppInfoService} from './components/app-info/app-info.service';
import {MatTableModule} from '@angular/material/table';
import {EmptyTableComponent} from './components/empty-table/empty-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ModuloService} from './services/modulo.service';
import {LoadingComponent} from "./components/loading/loading.component";
import {LoadingService} from "./services/loading.service";

@NgModule({
    declarations: [
        InputComponent,
        AppInfoComponent,
        EmptyTableComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        MatTableModule,
        MatCheckboxModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        InputComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        AppInfoComponent,
        MatTableModule,
        EmptyTableComponent,
        MatCheckboxModule,
        LoadingComponent
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                MessageService,
                AppInfoService,
                ModuloService,
                LoadingService
            ]
        };
    }

}
