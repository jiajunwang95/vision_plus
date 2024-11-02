import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/reusable/sidenav/sidenav.component';
import { StackedcolumnComponent } from './components/reusable/g2plot/stackedcolumn/stackedcolumn.component';
import { ClarityModule } from '@clr/angular';
// API
import { HttpClientModule } from '@angular/common/http';


//Ng Zorro....
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BotnavComponent } from './components/reusable/botnav/botnav.component';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n'; // Import the English locale
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
//Additional Component
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FormComponent } from './components/reusable/form/form.component'
import { LoggingService } from './services/logging.service';
import { NotificationCardComponent } from './components/reusable/notification-card/notification-card.component';
import { TopnavComponent } from './components/reusable/topnav/topnav.component';
import { CardholderComponent } from './components/landingpage/components/cardholder/cardholder.component';
import { AdminpageComponent } from './components/reusable/adminpage/adminpage.component';
import { DataTabComponent } from './components/reusable/adminpage/admin_tabs/data-tab/data-tab.component';
import { AdminService } from './services/admin.service';
import { FilterBarComponent } from './components/reusable/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    StackedcolumnComponent,
    LandingpageComponent,
    FormComponent,
    BotnavComponent,
    NotificationCardComponent,
    TopnavComponent,
    CardholderComponent,
    AdminpageComponent,
    DataTabComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzListModule,
    NzTableModule,
    NzIconModule,
    NzFormModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzInputModule,
    NzNotificationModule,
    NzToolTipModule,
    NzRadioModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoggingService,AdminService,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
