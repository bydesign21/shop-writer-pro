import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthModule } from 'src/features/auth-module/auth-module.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionService } from './session-store/domain-state/session.service';
import { SpinnerModule } from 'src/features/shared-module/spinner/spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { TicketStore } from 'src/features/dashboard-module/ticketing/store/tickets.store';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
registerLocaleData(en);

// configure app Icons Statically :/
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AkitaNgDevtools.forRoot({}),
    SpinnerModule,
    NzIconModule.forRoot(icons),
    HttpClientModule,
    BrowserAnimationsModule
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

