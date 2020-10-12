
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';
import { Observable, Subscription, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { AlertService } from './shared/services/alert.service';
import { AlertData } from './shared/models/alert-data.model';

/** 
 * Custom interceptor in charge of handling errors and displaying a spinner when loading data.
*/

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  
  constructor (
    private _spinnerService: SpinnerService,
    private _alertService: AlertService
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const spinnerSubscription: Subscription = this._spinnerService.spinner$.subscribe();
    return next.handle(req)
    .pipe(
        // Error handling
        catchError((error: HttpErrorResponse) => {          
          if (error.error instanceof ErrorEvent) {
            console.error(error.error);
            this._alertService.show({
              title: 'Error',
              text: error.error.message,
              type: 'error'
            } as AlertData);
            return throwError(error.error);
          }
          else {
            console.error(error);
            this._alertService.show({
              title: error.statusText,
              text: error.message,
              type: 'error'
            } as AlertData);
            return throwError(error);
          }
        }),
        finalize(() => spinnerSubscription.unsubscribe()));  
    }

    /** 
     * Gets a title string for each type of Http status codes.
    */
    private _getTitleByStatus(status: number) {
      const firstValue = +status.toString()[0];
      if (status === 404) {
        return 'Not Found';
      } else if(firstValue === 5) {
        return 'Internal Server Error';
      } else if (firstValue === 4) {
        return 'Server Error';
      } else {
        return 'Error';
      }

    }
}