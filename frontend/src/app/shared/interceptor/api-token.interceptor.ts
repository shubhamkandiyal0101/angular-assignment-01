import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError,  Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, mergeMap, flatMap, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from 'src/app/local-storage.service';


@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private route: ActivatedRoute, private router: Router, private injector: Injector, private http:HttpClient, private _localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>  {
    let apiUrl = request.url;
    let pageUrl = window.location.pathname;
    let apiUrlSplit = apiUrl.split('/')[2];
    let pageRoutePath = pageUrl.split('/')[1];

    const userToken = this._localStorageService.getItem('token');


    if(userToken['message-type'] == 'success' && userToken['data'] == '') {
      this.router.navigate(['/']);
    }



    if((pageRoutePath == 'dashboard')) {
        // add header token
        let requestClone;
          requestClone = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${userToken['data']}`
            }
          })
        // ends here ~ add header token
         

        // send modified request and handle error
        return next.handle(requestClone).pipe(
           catchError((error: HttpErrorResponse) => {
             let errorMessage = 0;
             // if (error.error instanceof ErrorEvent) {
               if(error.status == 401) {
                 // if user is unauthorized
                 this.handleAuthError(request, next);
                 // ends here ~ if user is unauthorized
               } else {
                 return throwError(error);
               }
             // } 
             // window.alert(error.status)
           })
        )
        // ends here ~ send modified request and handle error

      // ends here ~ code block works if user is already login

    } else {
      return next.handle(request)
    }

  }


  // function for handle 401 error (only in Access token)
  handleAuthError(request: HttpRequest<any>, next: HttpHandler) {
      // this.router.navigate(['/'])
      // sessionStorage.clear();
      // localStorage.clear();
  }
  // ends here ~ function for handle 401 error (only in Access token)

}