import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppInfoService {

    private readonly URL_API = environment.api_url + '/api/appinfo';

    constructor(private http: HttpClient) {
    }

    getAppInfo(): Observable<any> {
        return this.http.get<any>(this.URL_API);
    }

}
