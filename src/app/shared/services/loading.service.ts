import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LoadingService {

    private subjectMessage = new Subject<string>();
    private subjectEnable = new Subject<boolean>();

    getMessageObservable(): Observable<string> {
        return this.subjectMessage;
    }

    getEnableObservable(): Observable<boolean> {
        return this.subjectEnable;
    }

    updateMessage(message: string): void {
        this.subjectMessage.next(message);
    }

    start(message: string): void {
        this.updateMessage(message);
        this.subjectEnable.next(true);
    }

    done(): void {
        this.updateMessage('');
        this.subjectEnable.next(false);
    }

}
