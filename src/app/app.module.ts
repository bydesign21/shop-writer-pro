import { NgModule } from '@angular/core';
import { ContactModule } from 'src/features/contact-module/contact.module';
import { AuthModule } from 'src/features/auth-module/auth-module.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from 'src/features/home-module/home-module.module';
import { NavbarModule } from 'src/features/shared-module/navbar/navbar.module';
import { TicketingModule } from 'src/features/dashboard-module/ticketing/ticketing.module';
import { HomeComponent } from 'src/features/home-module/home.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SessionService } from './session-store/domain-state/session.service';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { SwpButtonModule } from 'src/features/shared-module/swp-button/swp-button.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TicketStore } from 'src/features/dashboard-module/ticketing/store/tickets.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ContactModule,
    AuthModule,
    AppRoutingModule,
    NavbarModule,
    NzIconModule,
    GooglePlaceModule,
    NzMessageModule,
    AkitaNgDevtools.forRoot({}),
    SpinnerModule,
    SwpButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [
    HomeComponent
  ],
  providers: [SessionService, TicketStore],
  // providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

