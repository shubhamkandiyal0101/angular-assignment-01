import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';


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

  loginForm = []
  loginEmail = '';
  loginPassword = '';
  isUserLoggedIn: boolean = false;

  
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

  constructor(private _localStorageService: LocalStorageService, private http:HttpClient, private router: Router) {
      // get user details on load
      this._localStorageService.getProfileAllDetails((serviceResp)=>{
        if(serviceResp != false) {
            this.isUserLoggedIn = true;
            this.router.navigate(['/dashboard'])
        }
      })
      // ends here ~ get user details on load
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
  
  // user registration function on submit form
  userRegistration(formData) {
  	const signupFormData = this.signupForm.value;
  	this._localStorageService.signup(signupFormData.fullName,signupFormData.email,signupFormData.password);
    
    // login user on signup
    this._localStorageService.login(signupFormData.email,signupFormData.password,(callbackData)=>{
      if(callbackData) {
        this.router.navigate(['/dashboard'])
      }
    })
    // ends here ~ login user on signup
  }
  // ends here ~ user registration function on submit form

  // user Login function on submit login form
  userLogin = (formData) => {
    this._localStorageService.login(formData.loginEmail,formData.loginPassword,(callbackData)=>{
      if(callbackData) {
        this.router.navigate(['/dashboard'])
      }
    })
  } 
  // ends here ~ user Login function on submit login form


}
