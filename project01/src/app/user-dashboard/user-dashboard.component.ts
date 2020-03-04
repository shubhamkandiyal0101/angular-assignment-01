import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userFullname: string;
  
  constructor(private _localStorageService:LocalStorageService, private router: Router) {

  	// get user details on load
  	this._localStorageService.getProfileAllDetails((serviceResp)=>{
  		if(serviceResp == false) {
        this.router.navigate(['/']);
      } else {
        this.userFullname = serviceResp.fullname;
      }
  	})
  	// ends here ~ get user details on load

   }

  ngOnInit() {
  }

}
