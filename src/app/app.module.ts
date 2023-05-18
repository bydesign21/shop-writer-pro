import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthModule } from 'src/features/auth-module/auth-module.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionService } from './session-store/domain-state/session.service';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketStore } from 'src/features/dashboard-module/ticketing/store/tickets.store';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { HomepageComponent } from 'src/features/corp-site/homepage.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    GooglePlaceModule,
    AkitaNgDevtools.forRoot({}),
    SpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    HomepageComponent
  ],
  providers: [
    SessionService,
    TicketStore,
    NzMessageService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

