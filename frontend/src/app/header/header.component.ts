import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isUserLoggedIn: boolean = false;

  constructor(private _localStorageService:LocalStorageService, private router:Router) {
  	// get user details on load
  	this._localStorageService.getProfileAllDetails((serviceResp)=>{
  		if(serviceResp != false) {
	        this.isUserLoggedIn = true;
	    }
  	})
  	// ends here ~ get user details on load
  }

  ngOnInit() {
  }

  logoutUser() {
  	localStorage.removeItem('loggedInUser');
  	this.router.navigate(['/']);
  }

}
