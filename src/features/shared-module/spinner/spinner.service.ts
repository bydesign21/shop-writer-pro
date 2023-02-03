import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
    constructor(
        private spinner: NgxSpinnerService
      ) {}

      public show(name?: string): Observable<unknown> {
        return from(this.spinner.show(name));
      }
    
      public hide(name?: string): Observable<unknown> {
       return from(this.spinner.hide(name))
      }
}
