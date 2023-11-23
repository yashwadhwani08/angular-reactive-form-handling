import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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

  // we want to write a custom validator, that ensures user is not using the username from the forbiddenUsernames
  forbiddenUsernames = ['Yash', 'Ansh'];

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

      //as in template-driven forms, we can a have a form-group inside a form-group for having a bunch of form-controls

      // formGroup is not only there to be used on the overall form, it just happens to be a form-group too. We can form-groups in form-groups, where form-controls can be placed inside of the inner form-group

      userData: new FormGroup({
        // pass the cutom validation function name, don't execute it. use bind(this) because without it, it would throw the error since Angular is calling(executing) forbiddenNames function not from inside of this class, ytherefore 'this' will not refer to our class here. Hence bind(this) makes sure that 'this' refers to what we want it to refer to.
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        // passing an array of validators

        // Async validator (or an array of async vaalidators) is the third as argument in the formControl

        // when using async validator, as the control-value changes, 'ng-pending' gets attached as dynamic class replacing ng-invalid/ng-valid and later when the async function is resolved, it is replaced by ng-valid/ng-invalid

        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      // FormArray to be used if you want to hold array of controls, to initialize pass an array, you could already initialize some form-controls or keep the array empty.
      hobbies: new FormArray([]),
    });
    // There is a form-state we can track in general
    // On each form and each control of the form, we have two observables we can listen to, 'statusChanges' and 'valueChanges' if you want to react to the form-changes.
    // The first arguement to subscribe is callback that gets executed when new data arrives.
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // On executing this, in browser on every keystroke in sny of the form-fields, the form-object (value of the form) is printed.

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
      // prints: INVALID, PENDING, VALID
    });

    // Just like setValue and patchValue methods in template-driven approach, we have setValue (to change values of the entire form) and patchValue (for partial updates to some of the values in the form) methods in reactive-approach as well

    this.signupForm.setValue({
      userData: {
        username: 'Yash',
        email: 'yash@test.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: { username: 'Ekta' },
    });
  }

  onSubmit() {
    // In this case of reactive-form handling, we don't need to get the form via local reference, that would not work either, since we are not using Angular's auto creation mechanism.

    // but instead, we can make use of the form-group we created in TS code, since it holds the overall form.
    console.log(this.signupForm);

    // On doing console.log, a FormGroup object is logged in which we get the 'value' property the key-value pairs of the JS object which makes up our FormGroup, keys being the control names we setup, values being the user-inputs. So whatever we set up as an argument in JS object while initializing the Form-Group, that is what we get out as a value of the form. So we can bind it our own model, the model of your application and make sure that the form structure matches the structure of your model.

    // form-restting is also available on reactive-forms just like template-driven approach. You can pass an object to reset() to reset to specific values.
    this.signupForm.reset();
  }

  // when the 'Add Hobby' button is clicked, a new hobby has to be added to 'hobbies' fom-array
  onAddHobby() {
    // Explicit casting to tell TS that this is of type FormArray, rarely we have to do this but in case of using FormArray we need to tell TS to not get an error.

    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;

    // Alternate typecasting syntax
    // return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  // We could have used getter method

  // get controls() { }

  // in the template:
  // *ngFor="let hobbyControl of controls; let i = index"

  // A validator in the end is just a function which gets executed by Angular automatically when it checks the validity of the form control and it does that whenever you change the control.

  // A validator needs to get control which it should check as argument to work correctly, a validator should also return something for angular to be able to handle the return value correctly. The return type would be a JS object, in the object, it should have any key which can be interpreted as a string. This (the square bracket notation [property: type]) is the typescript syntax for saying that key can be interpreted as a string
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    // IMP: return null if validation is successful or omit the return statement.
    return null;
  }

  // Creating an async validator
  // the return type is a promise or observable, the constructs which handle asynchronous data
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
