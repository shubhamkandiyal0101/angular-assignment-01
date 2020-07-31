import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  // regex
  nameRegex = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
  emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,4}$/;
  // ends here ~ regex

  // form
  loginForm = []
  loginEmail = '';
  loginPassword = '';
  // ends here ~ form

  constructor(private _httpService:HttpService, private _localStorageService: LocalStorageService, private http:HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {


  }





  // user Login function on submit login form
  userLogin = (formData) => {
    const payload = {
      'email':formData.loginEmail,
      'password':formData.loginPassword
    }

    // backend call
    this._httpService.post('/api/login', payload).subscribe((resp:any)=>{
      if(resp.status == 200) {
      	this.toastr.success(resp.body.message,'Success');
      }
    },(err:any)=>{
      	this.toastr.error(err.error.message,'Error');
    })
    // ends here ~ backend call

  } 
  // ends here ~ user Login function on submit login form




}
