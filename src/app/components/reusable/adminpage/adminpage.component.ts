import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"
import { LoggingService } from '../../../services/logging.service';
import { combineLatest, Subscription } from 'rxjs';
import { tabs } from '../../component_config/element'
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  USER; SESSION_ID;SELECTED_TAB;
  //For Error handling
  displayError = false; ErrorMsg = '';
  //For Mobile View related varibles...
  screenWidth: any;
  mobileView: boolean = false;
  private subscription: Subscription;

  //Variables that needed for this component
  tabs = tabs
  constructor(private LoggingService: LoggingService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    /**Subscribing the Screen Size, ignore this */
    this.subscription = this.LoggingService.data.subscribe(value => {
      this.mobileView = value;
    });
    /**Actual Performance on the component page. */
    Promise.all([
      this.LoggingService.getUser(),
      this.LoggingService.getUniqueSession()
    ]).then(res => {
      console.log("WHAT IS RES", res)
      this.USER = res[0]; this.SESSION_ID = res[1];
      combineLatest([
        this.activatedRoute.queryParams,
        this.LoggingService.loggingUserAction(this.USER, 'Entered Admin Page', this.SESSION_ID),
      ]).subscribe((res) => {
        //Perform your tasks here....
        const TAB = res[0]['tab'];
        if (TAB == undefined) {
          //This is to redirect the user to first tab if he pressed the nav bar...
          this.SELECTED_TAB = "LOG";
          this.router.navigate(['/admin'], {
            queryParams: {
              tab: 'log'
            },
            queryParamsHandling: 'merge',
          })
        }

      }, (err) => {
        this.LoggingService.loggingUserAction(this.USER, `Entered Admin Page with error : ${err['error']['message']}`, this.SESSION_ID,"ERROR").subscribe()
        console.log("subscribe error will fall here", err['error']);
        this.ErrorMsg = err['error']['message'] || 'Unknown Error';
        this.displayError = true;
      })
    }).catch(err => {
      this.LoggingService.loggingUserAction(this.USER, `Entered Admin Page with error : ${err['error']}`, this.SESSION_ID,"ERROR").subscribe()
      console.log("Promise.all error will fall here", err['error']);
      this.ErrorMsg = err['error']['message'] || 'Unknown Error';
      this.displayError = true;
    })
  }
  /**Unsubscribing the Screen Size, ignore this */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.LoggingService.loggingUserAction(this.USER, 'Exited Admin Page', this.SESSION_ID).subscribe();
  }
  tabChanged(event){
    /**Only work if ur text inside nzTitle... */
    console.log("What is event",event['tab']['nzTitle']);
    this.SELECTED_TAB = event['tab']['nzTitle']
  }
}
