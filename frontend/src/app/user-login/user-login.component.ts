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

  constructor(private _httpService:HttpService, private _localStorageService: LocalStorageService, private http:HttpClient, private router: Router, private toastr: ToastrService) {

      // check user is already logged in or not
      const userToken = this._localStorageService.getItem('token');
      if(userToken['message-type'] == 'success' && userToken['data'] != '') {
        this.router.navigate(['/dashboard']);
      }
      // ends here ~ check user is already logged in or not


  }

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

      console.log(' >> resp >> ',resp);

      // if(resp.status == 200) {
        const respBody = resp.body;
        this.toastr.success(respBody.message,'Success');

        const token = respBody.data.token;
      	this._localStorageService.storeItem('token',token);

        this.router.navigate(['/dashboard']);

      // }
    },(err:any)=>{
      	this.toastr.error(err.error.message,'Error');
    })
    // ends here ~ backend call

  } 
  // ends here ~ user Login function on submit login form




}
