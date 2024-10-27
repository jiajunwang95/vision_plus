import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter,ViewChild} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent {
  @Input() status : string ;
  @Input() message : string;
  @Input() mobileView : boolean;
  @ViewChild('template', {static : true}) template : any;
  title
  //this.status = success | info | warning | error
  constructor(private notification: NzNotificationService) {}
  ngOnInit(): void {
    console.log("What is mobileView",this.mobileView);
     this.title = this.status == 'error' ? 'Error experienced' : 'Successful'
    this.notification.template(
      this.template,
      { nzDuration: 0 });
  }
  closeExpand(){
    console.log("Close succesfful");
  }
}
