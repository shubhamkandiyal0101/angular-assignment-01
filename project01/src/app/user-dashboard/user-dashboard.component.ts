import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private _localStorageService:LocalStorageService) {

  	// get user details on load
  	this._localStorageService.getProfileAllDetails((serviceResp)=>{
  		console.log('serviceResp >> ',serviceResp)
  	})
  	// ends here ~ get user details on load

   }

  ngOnInit() {
  }

}
