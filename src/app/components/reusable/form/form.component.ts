import { Component } from '@angular/core';
import {AbstractControl,FormControl,FormGroup,NonNullableFormBuilder,ValidatorFn,Validators} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private fb: NonNullableFormBuilder){}
  validateForm : FormGroup<{
    name : FormControl<string>;
    password : FormControl<string>;
  }>;
}
