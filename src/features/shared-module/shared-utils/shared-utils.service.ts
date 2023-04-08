import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {

  constructor(private http: HttpClient) {}

  async getVehichleByVin(vin: string): Promise<any> {
    const req = new HttpRequest('GET', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/utils/vin-decoder/vehicles?vin=${vin}`, { withCredentials: true });
    return await lastValueFrom(this.http.request(req))
  }
}
