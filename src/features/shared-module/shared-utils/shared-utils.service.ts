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
        `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/utils/vin-decoder/vehicles`,
        {
          'vin': vin
        },
        null,
        {
          withCredentials: true
        }
      )
    return await this.executeRequest(request);
  }


  async createRequest(method: string, url: string, queryParams: any = {}, body: any = null, options: any = {}) {
    const cognitoKey = await this.authService.getCurrentUserCognitoKey();
    console.log('cognitoKey', cognitoKey)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${cognitoKey}`).set('Content-Type', 'application/json').set('Accept', 'application/json');
    let fullUrl = url;
    // If there are any query params, append them to the URL
    if (Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams();
      for (const key in queryParams) {
        params.set(key, queryParams[key]);
      }
      fullUrl += `?${params.toString()}`;
    }
    console.log('here')
    const req = new HttpRequest(method, fullUrl, body, {
      headers,
      ...options
    });

    console.log(req, 'req')

    return req;
  }

  async executeRequest(request: HttpRequest<any>) {
    console.log(request, 'request')
    return await lastValueFrom(
      this.http.request(request)
        .pipe(
          map((res: any) => res.body)
        )
    );
  }

}
