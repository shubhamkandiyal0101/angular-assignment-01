import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupForm: FormGroup;
  
  // regex
  nameRegex = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,4}$/;
  // ends here ~ regex
  
    // confirm password validator
    confirmPasswordValidation(c: AbstractControl): any {
  		if(!c.parent || !c) return;
	    const pwd = c.parent.get('password');
	    const cpwd = c.parent.get('confirmPassword');

	    if(pwd != null && cpwd != null) {
	    	return pwd.value === cpwd.value ? null : { invalid: true }
	    }
	};
	// ends here ~ confirm password validator

  constructor(private _localStorageService: LocalStorageService) {
  }

  ngOnInit() {

    // sign up form validation
    this.signupForm = new FormGroup({
	    fullName: new FormControl('',[
		  	Validators.required,
		  	Validators.minLength(2),
		  	Validators.maxLength(30),
		  	Validators.pattern(this.nameRegex)
	  	]),
	    email: new FormControl('',[
		  	Validators.required,
		  	Validators.maxLength(50),
		  	Validators.pattern(this.emailRegex)
	  	]),
	    password: new FormControl('',[
		  	Validators.required,
		  	Validators.minLength(8),
		  	Validators.maxLength(30)
	    ]),
	    confirmPassword: new FormControl('',[
		  	Validators.required,
		  	this.confirmPasswordValidation
	    ])
	});
    // ends here ~ sign up form validation

  }

  // get values for show validation error
  get fullName() { return this.signupForm.get('fullName') }
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get confirmPassword() { return this.signupForm.get('confirmPassword') }
  // ends here ~ get values for show validation error
  
  // function on submit form
  userRegistration(formData) {
  	const signupFormData = this.signupForm.value;
  	this._localStorageService.signup(signupFormData.fullName,signupFormData.email,signupFormData.password);
  }
  // ends here ~ function on submit form


}
