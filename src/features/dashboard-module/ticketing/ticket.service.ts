import { HttpErrorResponse, HttpEvent, HttpResponse, HttpProgressEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { catchError, from, lastValueFrom, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { Ticket } from './store/ticket.model';
import { TicketStore } from './store/tickets.store';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  constructor(
    private ticketStore: TicketStore,
    private utilService: SharedUtilsService
  ) {}

  uploadMedia(item: NzUploadXHRArgs): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', item.file as unknown as Blob, item.file.name);
    return from(this.utilService.createRequest(
      'POST',
      'https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/content/media/upload/ticket',
      {},
      formData,
      {
        reportProgress: true,
        withCredentials: false
      }
    )).pipe(
      switchMap(request => this.utilService.executeRequest(request)),
      tap((event: HttpEvent<any> | any) => {
        if (event.type === HttpEventType.Response) {
          item.onSuccess?.(event.body, item.file, event);
        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event.Location) { // If the response body is interpreted as an event
          item.onSuccess?.(event, item.file, event);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        item.onError?.(err, item.file);
        return throwError(() => new Error(err.message));
      })
    );
  }

  async getUserTickets(user: SessionState): Promise<Ticket[]> {
    const { email, role } = user;
    const request = await this.utilService.createRequest('GET', `https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/query/users/data`, {
      userId: email,
      entryId: role
    }, null, {
      withCredentials: false
    });

    return await lastValueFrom(this.utilService.executeRequest(request))
      .then((tickets) => {
        this.ticketStore.set(tickets);
        return tickets;
      });
  }

  async updateTicket(ticket: Ticket, user: SessionState): Promise<Ticket> {
    const { role } = user;
    const request = await this.utilService.createRequest('PATCH', `https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/content/ticket/update`, { entryId: role }, ticket, { withCredentials: false })
    return await lastValueFrom(this.utilService.executeRequest(request))
      .then(res => {
        console.log(res);
        return res.body;
      })
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
        'https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/update-entryId/username',
        {},
        {
          oldUsername: oldEntryId,
          newUsername: newEntryId
        },
        {
          withCredentials: false
        }
      )
    return lastValueFrom(this.utilService.executeRequest(request))
  }

  async getPaymentIntent(tickets: Partial<Ticket>[]) {
    const request = await this.utilService.createRequest(
      'POST',
      'https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/payment/payment-intent',
      {},
      tickets,
      {
        withCredentials: false
      }
    )
    return await lastValueFrom(this.utilService.executeRequest(request)).then((res) => {
      return res.clientSecret
    });
  }

  async submitTickets(tickets: Partial<Ticket>[]) {
    const request = await this.utilService.createRequest(
      'PUT',
      'https://8h3vwutdq2.execute-api.us-east-1.amazonaws.com/staging/core/content/ticket/upload',
      {},
      tickets,
      {
        withCredentials: false,
        reportProgress: true
      }
    )
    return lastValueFrom(this.utilService.executeRequest(request));
  }

}
