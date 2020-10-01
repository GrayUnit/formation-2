import { FormGroup, ValidatorFn } from '@angular/forms';

export function DependencyValidator(field: string, dependecies: string[]): ValidatorFn {
  return (form: FormGroup): {[key: string]: boolean} => {
    console.log("Hey validator");
    let validator: {[key: string]: boolean} = null;
    if(form.get(field).value) {
      dependecies.forEach((dep) => {
        if(!form.get(dep).value) {
          validator = {dependency: true};
          return;
        }
      });
    }
    return validator;
  }
}
