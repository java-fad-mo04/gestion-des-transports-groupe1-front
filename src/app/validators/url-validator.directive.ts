import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
// import { runInThisContext } from 'vm';

@Directive({
  selector: '[appUrlValidator]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi:
      true
  }]

})
export class UrlValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    // TODO écrire la règle de validation
    // En cas de règle respecté (value commence par http), retourner null
    // Sinon retourner l'objet { urlInvalide : true }

    return (control.value && control.value.startsWith('http')) ? null : { notHttp: true };
  }
}
