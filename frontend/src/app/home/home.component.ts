import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signupForm: FormGroup;


  isUserLoggedIn: boolean = false;
  
 

  constructor(private _httpService:HttpService, private _localStorageService: LocalStorageService, private http:HttpClient, private router: Router) {
      // get user details on load
      // this._localStorageService.getProfileAllDetails((serviceResp)=>{
      //   if(serviceResp != false) {
      //       this.isUserLoggedIn = true;
      //       this.router.navigate(['/dashboard'])
      //   }
      // })
      // ends here ~ get user details on load
  }

  ngOnInit() {

 

  }

  // get values for show validation error
  // get fullName() { return this.signupForm.get('fullName') }
  // get email() { return this.signupForm.get('email') }
  // get password() { return this.signupForm.get('password') }
  // get confirmPassword() { return this.signupForm.get('confirmPassword') }
  // ends here ~ get values for show validation error
  

}
