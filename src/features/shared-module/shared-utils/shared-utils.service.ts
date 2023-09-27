import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { Observable, from, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TicketStatus } from 'src/models/model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getVehichleByVin(vin: string): Observable<any> {
    return from(this
      .createRequest(
        'GET',
        `${environment.API_BASE_URL}/core/utils/vin-decoder/vehicles`,
        {
          'vin': vin
        },
        null,
        {
          withCredentials: false
        }
      )).pipe(
        switchMap(request => this.executeRequest(request))
      )
  }

  getUserProfileData(userId: string) {
    return from(
      this.createRequest(
        'GET',
        `${environment.API_BASE_URL}/core/query/users/profile`,
        { userId },
        null,
        {
          withCredentials: false
        }
      )
    )
      .pipe(
        switchMap(request => this.executeRequest(request)),
      )
  }


  async createRequest(method: string, url: string, queryParams: any = {}, body: any = null, options: any = {}) {
    const cognitoKey = await this.authService?.getCurrentUserCognitoKey() || null;
    let headers = new HttpHeaders();
    if (cognitoKey) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${cognitoKey}`);
    }
    let fullUrl = url;
    // If there are any query params, append them to the URL
    if (Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams();
      for (const key in queryParams) {
        params.set(key, queryParams[key]);
      }
      fullUrl += `?${params.toString()}`;
    }
    const req = new HttpRequest(method, fullUrl, body, {
      headers,
      ...options
    });
    console.log('req', req);
    return req;
  }

  executeRequest(request: HttpRequest<any>) {
    console.log('executeRequest', request);
    return this.http.request(request)
      .pipe(
        filter(event => event instanceof HttpResponse),
        map((res: HttpResponse<any>) => res.body)
      );

  }

  getTicketStatusPillColor(status: TicketStatus) {
    switch (status) {
      case TicketStatus.PENDING:
        return 'warning';
      case TicketStatus.IN_PROGRESS:
        return 'processing';
      case TicketStatus.COMPLETED:
        return 'success';
      case TicketStatus.CANCELLED:
        return 'error';
      case TicketStatus.REFUNDED:
        return 'error';
      default:
        return 'processing';
    }
  }

  sendEmail(options: EmailOptions, emailType: string): Observable<any> {
    return from(this.createRequest(
      'POST',
      `${environment.API_BASE_URL}/core/utils/email/send-email`,
      {},
      {
        options,
        emailType,
      },
      {
        withCredentials: false
      }
    )).pipe(
      switchMap(request => this.executeRequest(request)),
      catchError(error => {
        console.error("Error in sendEmail:", error);
        return throwError(error);
      }));
  }
}

export type EmailOptions = {
  email: string;
  name: string;
  [key: string]: string;
}
