import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // FormGroup package is required to be added when working with reactive-forms, it contains a lot of classes which are used in reactive-forms.

  // ngForm is say, an automatically created wrapper,but in the end it was wrapping a form-group in the end, because in Angular, a form in the end is just a group of controls, this is what FormGroup holds! Hence, overall form also is just a form-group.

  // this signupForm property will hold our form

  signupForm: FormGroup;
  genders = ['male', 'female'];

  // the form should be initialized before rendering the template, hence make sure to use a lifecycle hook which is called before the template is rendered.

  ngOnInit(): void {
    // we set it to a object of FormGroup, the constructor of FormGroup requires a JS object, which configures the controls of this form.
    // Initialising with an empty JS object, tells angular that this form doesn't have any controls.
    // Controls are basically key-value pairs in the JS object we pass to FormGroup

    // We wrap the control-names in quotation marks, since during minification (when this code gets mangled),HTML code.

    // the controls are objectss of FormControl, whose constructor takes a couple of arguements. 1st arg is 'initial state/ initial value' of this control,
    // 2nd arg is 'validator' (single or array of validators) we want to apply to this control.
    // 3rd arg is potential asynchronous validators
    this.signupForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl('male'),
    });
  }
}
