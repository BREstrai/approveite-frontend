import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {FormControlName} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() name: string;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit(): void {
  }

  hasError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  showValidations(): string {
    const error = this.control.errors;
    const key = Object.keys(error);
    let length = 0;
    let message;
    switch (key[0]) {
      case 'required':
        message = (`${this.name} é obrigatório(a)`);
        break;
      case 'minlength':
        length = error[key[0]].requiredLength;
        message = (`Mínimo de caracteres ${length}`);
        break;
      case 'maxlength':
        length = error[key[0]].requiredLength;
        message = (`Máximo de caracteres ${length}`);
        break;
      case 'email':
        message = (`E-mail inválido`);
        break;
      case 'min':
        message = (`Valor mínimo ${error[key[0]].min}`);
        break;
      case 'max':
        message = (`Valor máximo ${error[key[0]].max}`);
        break;
    }
    return message;
  }

}
