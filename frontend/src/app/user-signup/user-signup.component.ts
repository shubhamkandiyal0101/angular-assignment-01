import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
	// regex
  	nameRegex: RegExp = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
  	emailRegex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,4}$/;
  	// ends here ~ regex


  constructor(private _httpService:HttpService, private _localStorageService: LocalStorageService, private http:HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

     // sign up form 
    signupForm = new FormGroup({
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
    // ends here ~ sign up form 


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

	  // user registration function on submit form
	  userRegistration(formData) {
	  	let signupFormData = this.signupForm.value;
	    delete signupFormData['confirmPassword'];

	    // backend call
	    this._httpService.post('/api/signup', signupFormData).subscribe((resp:any)=>{
	      if(resp.status == 200) {
	      	this.toastr.success(resp.body.message,'Success');
	      	this.router.navigate(['/login']);
	      }
	    },(err:any)=>{
	      	this.toastr.error(err.error.message,'Error');
	    })
	    // ends here ~ backend call
	  }
	  // ends here ~ user registration function on submit form

	  get signup_form_control() {
	  	return this.signupForm.controls;
	  }

}
