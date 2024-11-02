import { Component, Input, OnInit } from '@angular/core';
import { LoggingService } from '../../../../../services/logging.service';
import { AdminService } from '../../../../../services/admin.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-data-tab',
  templateUrl: './data-tab.component.html',
  styleUrls: ['./data-tab.component.scss']
})
export class DataTabComponent implements OnInit {
  constructor(private LoggingService: LoggingService, private AdminService : AdminService) { }
  @Input() mobileView : boolean;
  @Input() USER : string;
  @Input() SESSION_ID : string;
  //For Error handling
  displayError = false; ErrorMsg = '';
  /** Components Variables */
  //Table related
  selectedTable = '';
  KEYWORD = 'VISION_';
  TABLE_COLUMN = {};TABLE_DATA = [];displayData = [];TABLE_NAME = [];
  editId: string = '';editData : any = {}; selectedColumn : string = '';
  selectedAction;
  /**Modal related */
  ngOnInit(): void {
    combineLatest([
      this.LoggingService.loggingUserAction(this.USER, 'Entered Admin data tab', this.SESSION_ID),
      this.AdminService.getAvailableTable(this.KEYWORD),
    ]).subscribe((res) => {
      //Perform your tasks here....
      console.log("What is res",res);
      this.TABLE_NAME =res[1];
      if(this.TABLE_NAME.length == 1){
        this.selectedTable = this.TABLE_NAME[0]['TABLE_NAME'];
        this.searchTableinDB();
      }
    }, (err) => {
      this.LoggingService.loggingUserAction(this.USER, `Entered Admin data tab with error : ${err['error']}`, this.SESSION_ID,"ERROR").subscribe()
      console.log("subscribe error will fall here", err['error']);
      this.ErrorMsg = err['error']['message'] || 'Unknown Error';
      this.displayError = true;
    })
  }
  /**Search selected table */
  searchTableinDB() : void {
    combineLatest([
      this.LoggingService.loggingUserAction(this.USER, `In Admin data tab, searched table ${this.selectedTable}`, this.SESSION_ID),
      this.AdminService.getTable(this.selectedTable.toUpperCase()),
    ]).subscribe((res) => {
      //Perform your tasks here....
      console.log("What is res",res);
      this.TABLE_COLUMN = res[1]['COLUMN'];
      this.TABLE_DATA = res[1]['DATA'];
      this.displayData = this.TABLE_DATA;
    }, (err) => {
      this.LoggingService.loggingUserAction(this.USER, `In Admin data tab, searched table ${this.selectedTable} with error : ${err['error']}`, this.SESSION_ID,"ERROR").subscribe()
      console.log("subscribe error will fall here", err['error']);
      this.ErrorMsg = err['error']['message'] || 'Unknown Error';
      this.displayError = true;
    })
  }
  /** Table functions.... */
  startEdit(entry,action): void {
    console.log("Start edit",entry);
    this.selectedColumn = entry['ID'];
    this.editId = entry[this.selectedColumn];
    this.editData = entry
    this.selectedAction = action;
  }

  stopEdit(): void {
    this.editId = '';
  }
  saveEdit(data) : void {
    console.log("What is this",data);
  }
  deleteEntry(data) : void {
    console.log("Data to be deleted...",data);
  }
  searchActivated(event) : void{
    console.log("What is being searched",event);
    if(event.length > 0)this.displayData = this.TABLE_DATA.filter(x => event.includes(x['HOSTNAME']));
    else this.displayData = this.TABLE_DATA;
    
  }

}
