

import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, take, takeUntil, tap } from 'rxjs';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { Ticket } from '../ticketing/store/ticket.model';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'swp-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {
  public data$ = new BehaviorSubject<Ticket[]>(null);
  private destroy$ = new EventEmitter();
  dataLoading$ = new BehaviorSubject<boolean>(false);
  profileRole$ = new BehaviorSubject<string>(null);
  tableLimit = 10;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => this.dataLoading$.next(true)),
        takeUntil(this.destroy$),
        switchMap((params: any) => {
          const { email, role } = params;
          this.profileRole$.next(role);
          return this.ticketService.getUserTickets({ email, role } as SessionState, false);
        })
      )
      .subscribe({
        next: (tickets) => {
          this.data$.next(tickets);
          this.dataLoading$.next(false);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
