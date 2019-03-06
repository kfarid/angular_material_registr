import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';

class PassMacher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  myRegForm: FormGroup;
 passmach = new PassMacher();

 constructor(private fb: FormBuilder) {}

 get form() {
   return this.myRegForm.controls;
 }

 initForm() {
   this.myRegForm = this.fb.group({
   email: ['', [Validators.required, Validators.pattern('^([0-9]{9})|([A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})$')]],
   password: ['', [Validators.required, Validators.minLength(8)]],
   password2: ['', ]
   }, {validator: ConfirmPassword});
 }

  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    if ( this.myRegForm.invalid) {
      return;
    } else {
      alert('Registration finish !!');
    }
  }
}




function ConfirmPassword(control: AbstractControl): {[key: string]: boolean} | null {
  const condition = control.get('password').value !== control.get('password2').value;
  return condition ? { passwordsDoNotMatch: true} : null;
}
