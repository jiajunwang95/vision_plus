import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoggingService } from '../../../../../services/logging.service';
import { AdminService } from '../../../../../services/admin.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-log-tab',
  templateUrl: './log-tab.component.html',
  styleUrls: ['./log-tab.component.scss']
})
export class LogTabComponent implements OnChanges {
  constructor(private LoggingService: LoggingService, private AdminService : AdminService) { }
  @Input() mobileView : boolean;
  @Input() USER : string;
  @Input() SESSION_ID : string;
  @Input() SELECTED_TAB : string;
  //For Error handling
  displayError = false; ErrorMsg = '';
  /** Tab Content */
  tabDetail = ['USER','CRON'];
  cachedLog = {};
  selectedLog;
  ngOnChanges(changes : SimpleChanges): void {
    console.log("hehehe",this.USER,"CHANGE",changes);
    if((changes['SELECTED_TAB'] == undefined)){
      //Initial
      console.log("Init...?");
      this.updateLog();
    }
 
  }
  tabChanged(event){
    /**Only work if ur text inside nzTitle... */
    this.selectedLog = event['tab']['nzTitle'];
    if(this.cachedLog[this.selectedLog] == undefined){
      this.updateLog();
    }
  }
  updateLog(){
    this.selectedLog = this.selectedLog || this.tabDetail[0];
    combineLatest([
      this.LoggingService.loggingUserAction(this.USER, `Entered Admin log tab selected ${this.selectedLog}`, this.SESSION_ID),
      this.AdminService.getLog(this.selectedLog,5000)
    ]).subscribe((res) => {
      //Perform your tasks here....
      console.log("What is res",res);
      this.cachedLog[this.selectedLog] = res[1];
      console.log("What is this.cachedLog",this.cachedLog);

    }, (err) => {
      this.LoggingService.loggingUserAction(this.USER, `Entered Admin log tab selected ${this.selectedLog} with error : ${err['error']}`, this.SESSION_ID,"ERROR").subscribe()
      console.log("subscribe error will fall here", err['error']);
      this.ErrorMsg = err['error']['message'] || 'Unknown Error';
      this.displayError = true;
    })
  }
}
