import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Ticket } from 'src/features/dashboard-module/ticketing/store/ticket.model';
import { TicketStatus, UserRole } from 'src/models/model';
import { insuranceList } from '../shared-utils/shared.model';

@Component({
  selector: 'swp-ticket-viewer',
  templateUrl: './ticket-viewer.component.html',
  styleUrls: ['./ticket-viewer.component.scss'],
  providers: [DecimalPipe]
})
export class TicketViewerComponent implements OnInit {
  @Output() ticketSubmitted = new EventEmitter<boolean>(false);
  @Input() rules: UserRole | string;
  userRole = UserRole;
  constructor(
    private messageService: NzMessageService,
  ) {}
  @Input() ticket: Ticket;
  @Output() ticketUpdated = new EventEmitter<Ticket>();
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
    console.log(this.rules, 'rules')
    this.updatedTicket = { ...this.ticket };
    if (this.rules === UserRole.EMPLOYEE) {
      this.panels = [
        ...this.panels,
        {
          active: false,
          disabled: false,
          name: 'Review',
          id: 5
        }
      ]
    }
  }

  handleEditButtonTrigger(event: any) {
    this.editVehicleInfo = !this.editVehicleInfo;
  }

  handleEditVehicleInfo(event: any) {
    if (this.updatedTicket.status === TicketStatus.PENDING) {
      const vehicleInfo: Ticket = {
        ...this.updatedTicket,
        lastUpdated: new Date().toISOString(),
        insurance: this.updatedTicket.insurance['value'] ? this.updatedTicket.insurance['value'] : this.updatedTicket.insurance
      };
      this.ticketUpdated.emit(vehicleInfo);
  } else {
    this.messageService.error('Ticket must be in a pending state to edit');
  }
}
}
