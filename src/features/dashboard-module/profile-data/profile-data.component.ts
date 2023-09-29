import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, take, takeUntil, tap } from 'rxjs';
import { SessionState } from 'src/app/session-store/domain-state/session.store';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

import { Ticket } from '../ticketing/store/ticket.model';
import { TicketService } from '../ticketing/ticket.service';

@Component({
  selector: 'swp-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent implements OnInit {
  public data$ = new BehaviorSubject<Ticket[]>(null);
  private destroy$ = new EventEmitter();
  loading$ = new BehaviorSubject<boolean>(null);
  dataLoading$ = new BehaviorSubject<boolean>(false);
  profileRole$ = new BehaviorSubject<string>(null);
  tableLimit = 10;
  email: string;
  userProfile$ = new BehaviorSubject<any>(null);
  userForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private utilService: SharedUtilsService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => this.dataLoading$.next(true)),
        takeUntil(this.destroy$),
        switchMap((params: any) => {
          const { email, role } = params;
          this.profileRole$.next(role);
          this.email = email;
          return this.ticketService.getUserTickets(
            { email, role } as SessionState,
            false,
          );
        }),
      )
      .subscribe({
        next: (tickets) => {
          this.data$.next(tickets);
          this.dataLoading$.next(false);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.getProfileDetails(this.email);
  }

  getProfileDetails(userId: string) {
    this.utilService
      .getUserProfileData(userId)
      .pipe(
        tap(() => this.loading$.next(true)),
        take(2),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        console.log(res);
        this.userProfile$.next(res);
        this.loading$.next(false);
      });
  }
}
