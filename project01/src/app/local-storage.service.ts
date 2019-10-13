import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  signup(fullname, email, password) {
  	
  	// create object
  	const completeInfo = {
  		'fullname':fullname,
  		'email':email,
  		'password':password
  	}
  	// ends here ~ create object
  	
  	const userProfileDetails = localStorage.getItem('userProfile')

  	// if any data exists
  	if(userProfileDetails != '' && userProfileDetails != undefined && userProfileDetails != null) {
  		
  		const userProfileArray = JSON.parse(userProfileDetails) // array data get from localstorage

  		// check user exists or not 
  		let userExists = userProfileArray.find((o, i) => {
		    if (o.email === email) {
		        return true; 
		    }
		});
		if(userExists == undefined) {
			userExists = false;
		}
		// ends here ~ check user exists or not

	  	// set data into localstorage
		if(userExists == false) {
			userProfileArray.push(completeInfo)
		  	localStorage.setItem('userProfile',JSON.stringify(userProfileArray))
		}
	  	// ends here ~ set data into localstorage
  	
  	} else {
  		// if any data doesn't exists
		localStorage.setItem('userProfile',JSON.stringify([completeInfo]))
  	}



  }
}
