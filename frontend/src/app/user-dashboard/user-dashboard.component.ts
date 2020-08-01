import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userFullname: string;
  isUserLoggedIn: boolean = false;
  
  constructor(private _localStorageService:LocalStorageService, private router: Router, private _http:HttpService, private toastr: ToastrService) {

  	// get user details on load
  	const userToken = this._localStorageService.getItem('token');
    if(userToken['message-type'] == 'success') {
        this.isUserLoggedIn = true;
    }
  	// ends here ~ get user details on load

    if(this.isUserLoggedIn) {
      this._http.get('/api/user-details').subscribe((resp:any)=>{
        if(resp.status == 200) {
           const respBody = resp.body;
           this.userFullname = respBody.data.user.name;
          this.toastr.success(respBody.message,'Success');
        }
      },(err:any)=>{
        if(err.error == null) {
          this.toastr.error(err,'Error');
          this.router.navigate(['/login']);
          return;
        }
        this.toastr.error(err.error.message,'Error');
      })
    }

   }

  ngOnInit() {
  }

}
