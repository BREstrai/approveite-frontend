import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class MessageService {

    constructor(private snackBar: MatSnackBar) {
    }

    show(text: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(text, action, {
            duration,
            panelClass: 'message-bar'
        });
    }

}
