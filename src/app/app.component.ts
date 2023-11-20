import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      // When using validatoers, make sure to not call the method (not use parenthese after the method name), just give the refernce of the method since it is a static method made available by validators here. Angular will execute the method whenever it detects that the input of this form-control changed. it just needs to have reference on what it should execute at this point of time.

      // passing a single validator
      "username": new FormControl(null, Validators.required),

      // passing an array of validators
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "gender": new FormControl('male'),
    });
  }

  onSubmit() {
    // In this case of reactive-form handling, we don't need to get the form via local reference, that would not work either, since we are not using Angular's auto creation mechanism.

    // but instead, we can make use of the form-group we created in TS code, since it holds the overall form.
    console.log(this.signupForm);

    // On doing console.log, a FormGroup object is logged in which we get the 'value' property the key-value pairs of the JS object which makes up our FormGroup, keys being the control names we setup, values being the user-inputs. So whatever we set up as an argument in JS object while initializing the Form-Group, that is what we get out as a value of the form. So we can bind it our own model, the model of your application and make sure that the form structure matches the structure of your model.
  }
}
