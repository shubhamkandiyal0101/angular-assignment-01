import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dashboard', component: UserDashboardComponent },
	{ path: 'login', component: UserLoginComponent },
	{ path: 'signup', component: UserSignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
