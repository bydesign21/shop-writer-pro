import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthModule } from 'src/features/auth-module/auth-module.module';
import { TicketStore } from 'src/features/dashboard-module/ticketing/store/tickets.store';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionService } from './session-store/domain-state/session.service';

/** config angular i18n **/
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AkitaNgDevtools.forRoot({}),
    SpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SessionService,
    TicketStore,
    NzMessageService,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
