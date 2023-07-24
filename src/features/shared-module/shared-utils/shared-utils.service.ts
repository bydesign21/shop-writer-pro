import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { from, lastValueFrom, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TicketStatus } from 'src/models/model';
@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  async getVehichleByVin(vin: string): Promise<any> {
    const request = await this
      .createRequest(
        'GET',
        `https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/utils/vin-decoder/vehicles`,
        {
          'vin': vin
        },
        null,
        {
          withCredentials: false
        }
      )
    return await this.executeRequest(request);
  }

  getUserProfileData(userId: string) {
    return from(
      this.createRequest(
        'GET',
        `https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/query/users/profile`,
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
    const cognitoKey = await this.authService.getCurrentUserCognitoKey();
    let headers = new HttpHeaders();
    if (cognitoKey) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${cognitoKey}`)
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
    return req;
  }

  executeRequest(request: HttpRequest<any>) {
    return this.http.request(request)
      .pipe(
        map(
          (res: any) => {
            // Check if the response is an object that has a body property
            if (typeof res === 'object' && res.body !== undefined) {
              return res.body;
            }
            // Otherwise, return the response as is
            return res;
          }
        ));
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

  async sendEmail(options: EmailOptions, emailType: string) {
    const request = await this.createRequest(
      'POST',
      `https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/utils/email/send-email`,
      {},
      {
        options,
        emailType,
      },
      {
        withCredentials: false
      }
    )
    return this.executeRequest(request);
  }
}

export type EmailOptions = {
  email: string;
  name: string;
  [key: string]: string;
}
