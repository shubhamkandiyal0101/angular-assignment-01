import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isUserLoggedIn: boolean = false;

  constructor(private _localStorageService:LocalStorageService, private router:Router) {
  	 
    

    // get user details on load
  	// this._localStorageService.getItem((serviceResp)=>{
  	// 	if(serviceResp != false) {
	  //       this.isUserLoggedIn = true;
	  //   }
  	// })
  	// ends here ~ get user details on load
  }

  ngOnInit() {

    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
        const userToken = this._localStorageService.getItem('token');
        console.log(userToken)
        if(userToken['message-type'] == 'success') {
            this.isUserLoggedIn = true;
        }
    })


  }

  logoutUser() {
  	localStorage.removeItem('token');
  	this.router.navigate(['/']);
    this.isUserLoggedIn = false;
  }

}
