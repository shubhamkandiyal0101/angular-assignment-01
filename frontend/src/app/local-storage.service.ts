import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  // service function for storage only unique email user to localstorage 
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
  // ends here ~ service function for storage only unique email user to localstorage

  // service function for fetch user data from localstorage on basis of email and password
  login(email, password, callback) {
    const loginEmail = email;
    const loginPassword = password;


    const userProfileDetails = localStorage.getItem('userProfile')

    // if any data exists
    if(userProfileDetails != '' && userProfileDetails != undefined && userProfileDetails != null) {
      
      const userProfileArray = JSON.parse(userProfileDetails) // array data get from localstorage

          // check user exists or not 
          let userExists = userProfileArray.find((data, index) => {
                if (data.email == loginEmail && data.password == loginPassword) {
                    localStorage.setItem('loggedInUser',JSON.stringify(data))
                    callback(true);
                }
          });
     }

  }
  // ends here ~ service function for fetch user data from localstorage on basis of email and password

  // get current login user all details
  getProfileAllDetails(callback) {
      const userProfileDetail = localStorage.getItem('loggedInUser')


      if(userProfileDetail != '' && userProfileDetail != undefined && userProfileDetail != null) {
        // if any data exists
        const userProfileArray = JSON.parse(userProfileDetail) // array data get from localstorage
        callback(userProfileArray)
          
       } else {
           callback(false)
       }
  }
  // ends here ~ get current login user all details

}
