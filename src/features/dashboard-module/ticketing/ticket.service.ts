import {
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
  HttpProgressEvent,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import {
  catchError,
  from,
  lastValueFrom,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { environment } from 'src/environments/environment';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

import { Ticket } from './store/ticket.model';
import { TicketStore } from './store/tickets.store';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private ticketStore: TicketStore,
    private utilService: SharedUtilsService,
  ) {}

  uploadMedia(item: NzUploadXHRArgs): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', item.file as unknown as Blob, item.file.name);
    return from(
      this.utilService.createRequest(
        'POST',
        `${environment.API_BASE_URL}/core/content/media/upload/ticket`,
        {},
        formData,
        {
          reportProgress: true,
          withCredentials: false,
        },
      ),
    ).pipe(
      switchMap((request) => this.utilService.executeRequest(request)),
      tap((event: HttpEvent<any> | any) => {
        if (event.type === HttpEventType.Response) {
          item.onSuccess?.(event.body, item.file, event);
        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event.Location) {
          // If the response body is interpreted as an event
          item.onSuccess?.(event, item.file, event);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        item.onError?.(err, item.file);
        return throwError(() => new Error(err.message));
      }),
    );
  }

  getUserTickets(user: SessionState): Observable<Ticket[]> {
    const { email, role } = user;
    return from(
      this.utilService.createRequest(
        'GET',
        `${environment.API_BASE_URL}/core/query/users/data`,
        {
          userId: email,
          entryId: role,
        },
        null,
        {
          withCredentials: false,
        },
      ),
    ).pipe(switchMap((request) => this.utilService.executeRequest(request)));
  }

  async updateTicket(ticket: Ticket, user: SessionState): Promise<Ticket> {
    const { role } = user;
    const request = await this.utilService.createRequest(
      'PATCH',
      `${environment.API_BASE_URL}/core/content/ticket/update`,
      { entryId: role },
      ticket,
      { withCredentials: false },
    );
    return lastValueFrom(this.utilService.executeRequest(request)).then(
      (res) => res?.body,
    );
  }

  async updateUserRecordEntryId(oldEntryId: string, newEntryId: string) {
    const request = await this.utilService.createRequest(
      'POST',
      '${environment.API_BASE_URL}/core/update-entryId/username',
      {},
      {
        oldUsername: oldEntryId,
        newUsername: newEntryId,
      },
      {
        withCredentials: false,
      },
    );
    return lastValueFrom(this.utilService.executeRequest(request));
  }

  async getPaymentIntent(tickets: Partial<Ticket>[]) {
    const request = await this.utilService.createRequest(
      'POST',
      `${environment.API_BASE_URL}/core/payment/payment-intent`,
      {},
      tickets,
      {
        withCredentials: false,
      },
    );
    return await lastValueFrom(this.utilService.executeRequest(request)).then(
      (res) => {
        return res.clientSecret;
      },
    );
  }

  async submitTickets(tickets: Partial<Ticket>[]) {
    const request = await this.utilService.createRequest(
      'PUT',
      `${environment.API_BASE_URL}/core/content/ticket/upload`,
      {},
      tickets,
      {
        withCredentials: false,
        reportProgress: true,
      },
    );
    return lastValueFrom(this.utilService.executeRequest(request));
  }
}
