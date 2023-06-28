import {Component, Input, OnInit} from '@angular/core';
import {AppInfoService} from './app-info.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent implements OnInit {

    @Input() textClass = 'text-primary';
    @Input() showLogo = true;

    version = '0.0.0';

    constructor(private appInfoService: AppInfoService) {
    }

    ngOnInit(): void {
      if (environment.production) {
        this.appInfoService.getAppInfo().subscribe(result => {
          if (!!result) {
            this.version = result['Implementation-Version'];
          }
        });
      }
    }

}
