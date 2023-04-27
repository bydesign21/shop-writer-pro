import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from, take } from 'rxjs';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';
import { TicketService } from 'src/features/dashboard-module/ticketing/ticket.service';
import { SharedUtilsService } from '../shared-utils/shared-utils.service';
import { insuranceList } from '../shared-utils/shared.model';

@Component({
  selector: 'app-ticket-viewer',
  templateUrl: './ticket-viewer.component.html',
  styleUrls: ['./ticket-viewer.component.scss'],
  providers: [DecimalPipe]
})
export class TicketViewerComponent implements OnInit {
  @Output() ticketSubmitted = new EventEmitter<boolean>(false);
constructor(
  private utilsService: SharedUtilsService,
  private ticketService: TicketService,
  private messageService: NzMessageService
) {}
@Input() ticket: Ticket;
updatedTicket: Ticket;
editVehicleInfo = false;
insuranceList = insuranceList;
panels = [
  {
    active: true,
    name: 'Plan',
    disabled: false,
    id: 1
  },
  {
    active: false,
    disabled: false,
    name: 'Vehicle Details',
    id: 2
  },
  {
    active: false,
    disabled: false,
    name: 'Damage Description',
    id: 3
  },
  {
    active: false,
    disabled: false,
    name: 'Uploaded Images',
    id: 4
  }
];

ngOnInit(): void {
  this.updatedTicket = {...this.ticket};
}

handleEditButtonTrigger(event: any) {
  this.editVehicleInfo = !this.editVehicleInfo;
}

handleEditVehicleInfo(event: any) {
  if (this.updatedTicket.status === 'pending') {
    const vehicleInfo: Ticket = {
      ...this.updatedTicket,
      lastUpdated: new Date().toISOString(),
      insurance: this.updatedTicket.insurance['value'] ? this.updatedTicket.insurance['value'] : this.updatedTicket.insurance
    };
    from(this.ticketService.updateTicket(vehicleInfo))
    .pipe(
      take(1)
      )
      .subscribe((ticket: Ticket) => {
        return ticket;
    },
    error => {
      this.messageService.error(error.message);
    },
    () => {
      this.messageService.success('Ticket Updated Successfully');
      this.ticketSubmitted.next(true);
    })
  } else {
    this.messageService.error('Ticket must be in pending state to edit');
  }
}
}
