import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { map } from 'rxjs';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { Ticket } from './store/ticket.model';
import { TicketStore } from './store/tickets.store';
import { roleToEntryId } from 'src/features/shared-module/models/util.interface';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  constructor(
    private http: HttpClient,
    private ticketStore: TicketStore,
    private utilService: SharedUtilsService
  ) { }

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

  async getUserTickets(user: SessionState): Promise<Ticket[]> {
    const { email, role } = user;
    console.log(roleToEntryId[role], role);
    const request = await this.utilService.createRequest('GET', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/query/users/data`, {
      userId: email,
      entryId: roleToEntryId[role]
    }, null, {
      withCredentials: true
    });

    return await this.utilService.executeRequest(request)
      .then((tickets) => {
        this.ticketStore.set(tickets);
        return tickets;
      });
  }

  async updateTicket(ticket: Ticket): Promise<Ticket> {
    const request = await this.utilService.createRequest('PATCH', `https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/content/ticket/update`, {}, ticket, { withCredentials: true })
    return await this.utilService.executeRequest(request)
      .then(res => res.data.Attributes)
      .then((updatedTicket) => {
        if (updatedTicket) {
          this.ticketStore.update(ticket?.ticketId, updatedTicket);
          return updatedTicket;
        } else {
          return null;
        }
      });
  }

  async updateUserRecordEntryId(oldEntryId: string, newEntryId: string) {
    const request = await this.utilService
      .createRequest(
        'POST',
        'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/update-entryId/username',
        {},
        {
          oldUsername: oldEntryId,
          newUsername: newEntryId
        },
        {
          withCredentials: true
        }
      )
    return await this.utilService.executeRequest(request)
  }

  async getPaymentIntent(tickets: Partial<Ticket>[]) {
    const request = await this.utilService.createRequest(
      'PUT',
      'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/payment/payment-intent',
      {},
      tickets,
      {
        withCredentials: true
      }
    )
    return await this.utilService.executeRequest(request);
  }

}
