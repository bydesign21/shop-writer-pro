import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/features/auth-module/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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


  async createRequest(method: string, url: string, queryParams: any = {}, body: any = null, options: any = {}) {
    const cognitoKey = await this.authService.getCurrentUserCognitoKey();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${cognitoKey}`)
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

  async executeRequest(request: HttpRequest<any>) {
    return await lastValueFrom(
      this.http.request(request)
        .pipe(
          map(
            (res: any) => res.body,
            (err: any) => err
          )
        )
    );
  }

}
