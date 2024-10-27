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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
//Additional Component
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FormComponent } from './components/reusable/form/form.component'
import { LoggingService } from './services/logging.service';
import { NotificationCardComponent } from './components/reusable/notification-card/notification-card.component';
import { TopnavComponent } from './components/reusable/topnav/topnav.component';
import { CardholderComponent } from './components/landingpage/components/cardholder/cardholder.component';

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
    CardholderComponent
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
    NzNotificationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoggingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
