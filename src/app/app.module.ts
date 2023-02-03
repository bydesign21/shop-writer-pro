import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactModule } from 'src/features/contact-module/contact.module';
import { AuthModuleModule } from 'src/features/auth-module/auth-module.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from 'src/features/home-module/home-module.module';
import { NavbarModule } from 'src/features/shared-module/navbar/navbar.module';
import { TicketingModuleModule } from '../features/ticketing-module/ticketing-module.module';
import { HomeComponent } from 'src/features/home-module/home.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SessionService } from './session-store/domain-state/session.service';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ContactModule,
    AuthModuleModule,
    AppRoutingModule,
    NavbarModule,
    TicketingModuleModule,
    NzIconModule,
    GooglePlaceModule,
    NzMessageModule,
    AkitaNgDevtools.forRoot({}),
    SpinnerModule,
  ],
  entryComponents: [
    HomeComponent
  ],
  providers: [SessionService],
  // providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

