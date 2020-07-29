import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 	// variables
   	httpHeaders: any;
   	// ends here ~ variables

   	
   	constructor(private http:HttpClient) {
	  	this.httpHeaders = new HttpHeaders({
		    'Content-Type': 'application/json',
		    'Access-Control-Allow-Origin':'*',
		    'Access-Control-Allow-Credentials': 'true',
		    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
		    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
		});
  	}


  // post request
  post(url: string, payload): Observable<object> {
  	let options = { headers: this.httpHeaders };
	  options["observe"] = "response";

    return this.http.post(url, payload, options);
  }
  // ends here ~ post request


}
