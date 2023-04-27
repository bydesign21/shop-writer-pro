import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { lastValueFrom, map } from 'rxjs';
import { Ticket } from './store/ticket.model';
import { TicketStore } from './store/tickets.store';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  constructor(
    private http: HttpClient,
    private ticketStore: TicketStore
  ) {}

  uploadPhotos(item: NzUploadXHRArgs) {
    const formData = new FormData();
    formData.append('file', item.file as unknown as Blob, item.file.filename);
    const req = new HttpRequest('POST', 'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/content/media/upload/ticket', formData, {
      reportProgress: true,
      withCredentials: true,
    });
    return this.http.request(req).pipe(map(
      (event: HttpEvent<object>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event?.total > 0) {
            // calculate the progress percentage
            const percentDone = Math.round((event.loaded / event?.total) * 100);
            // pass the percentage to the item that is currently being uploaded
            return item.onProgress?.(percentDone, item?.file);
          }
        } else if (event instanceof HttpResponse) {
          // success
          return item.onSuccess?.(event.body, item?.file, event);
        }
      },
      (err: HttpErrorResponse) => {
        // failed
        return item.onError?.(err, item?.file);
      }
    ));
  }

  async getTicketsByUserId(userId: string): Promise<Ticket[]> {
    const req = new HttpRequest('GET', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/query/users?userId=${userId}&entryId=ticket`);
    return await lastValueFrom(
      this.http.request(req)
        .pipe(
          map((res: any) => res.body as Ticket[])
        ))
      .then((tickets) => {
        this.ticketStore.set(tickets)
        return tickets;
      });
  }

  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const req = new HttpRequest('PATCH', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/content/ticket/update`, ticket);
    return await lastValueFrom(
      this.http.request(req)
        .pipe(
          map((res: any) => {
            return res?.body?.data?.Attributes as Ticket;
          })
        )
      )
    .then(
      (updatedTicket) => {
        if (updatedTicket) {
          this.ticketStore.update(ticket?.ticketId, updatedTicket);
          return updatedTicket;
        } else {
          return null;
        }
      }
    );
  }

  async getVehichleByVin(vin: string): Promise<any> {
    const req = new HttpRequest('GET', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/utils/vin-decoder/vehicles?vin=${vin}`, { withCredentials: true });
    return await lastValueFrom(this.http.request(req))
  }

}
