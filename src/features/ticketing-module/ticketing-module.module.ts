import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../shared-module/navbar/navbar.module';
import { TicketingContainerComponent } from './ticketing-container/ticketing-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SwpButtonModule } from '../shared-module/swp-button/swp-button.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzInputModule } from 'ng-zorro-antd/input';



@NgModule({
  declarations: [
    TicketingContainerComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzStepsModule,
    NzProgressModule,
    SwpButtonModule,
    NzRadioModule,
    NzUploadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule
  ]
})
export class TicketingModuleModule { }
