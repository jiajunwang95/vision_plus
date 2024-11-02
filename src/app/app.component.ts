import { Component, HostListener, OnInit,SimpleChanges } from '@angular/core';
import {general} from './components/component_config/sidenav'
import {ClarityIcons, dashboardIcon,blocksGroupIcon,resizeIcon,shrinkIcon,downloadIcon,gridViewIcon,keyIcon,pencilIcon,trashIcon,uploadIcon,
  windowCloseIcon
} from '@cds/core/icon';
import { LoggingService } from './services/logging.service';
import { combineLatest } from 'rxjs';
//Declare here so other compnents dont need to declare
ClarityIcons.addIcons(dashboardIcon);ClarityIcons.addIcons(blocksGroupIcon);ClarityIcons.addIcons(resizeIcon);
ClarityIcons.addIcons(shrinkIcon);ClarityIcons.addIcons(downloadIcon);ClarityIcons.addIcons(gridViewIcon);
ClarityIcons.addIcons(keyIcon);ClarityIcons.addIcons(pencilIcon);ClarityIcons.addIcons(trashIcon);ClarityIcons.addIcons(uploadIcon);
ClarityIcons.addIcons(windowCloseIcon)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //For the Navigation Bar variables
  isCollapsed : boolean = true;
  siderWidth : string = general.siderWidth;
  title : string = general.title;
  description : string = general.subtitle;
  appIcon : string = general.appIcon;
  constructor(private LoggingService : LoggingService){}
  //Logging related variables
  USER ; SESSION_ID;
  //For Mobile View related varibles...
  screenWidth : any;
  mobileView : boolean = false;
  //For Error handling
  displayError = false; ErrorMsg = '';
  ngOnInit() : void {
      /**
       * User logged in 
       */
      this.screenWidth = window.innerWidth;
      this.checkMobileView(this.screenWidth);
      this.LoggingService.data.next(this.mobileView);
      console.log("Screen Width Resize",this.screenWidth)
      Promise.all([
        this.LoggingService.setUser(),
        this.LoggingService.setUniqueSession()
      ]).then(res=>{
        console.log("WHAT IS RES",res)
        this.USER = res[0];this.SESSION_ID = res[1];
        combineLatest([
          this.LoggingService.loggingUserAction(this.USER, 'SIGN IN', this.SESSION_ID),
        ]).subscribe((res) =>{
            //Perform your tasks here....
            
        },(err)=>{
          console.log("subscribe error will fall here",err['error']);
          this.ErrorMsg = err['error']['message'] || 'Unknown Error';
          this.displayError = true;
        })
      }).catch(err =>{
        console.log("Promise.all error will fall here",err['error']);
        this.ErrorMsg = err['error']['message'] || 'Unknown Error';
        this.displayError = true;
      })

   }
   /**
    * When user close the window
    */
  @HostListener('window:beforeunload')
  ngOnDestroy() : void {
    Promise.all([
      this.LoggingService.exitSession()
    ]).then(res =>{
      this.LoggingService.loggingUserAction(this.USER,'SIGN OUT',this.SESSION_ID).subscribe(res =>{
      })

    })
  }
  /**
   * 
   * When User resize
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.screenWidth = window.innerWidth;
      this.checkMobileView(this.screenWidth);
      this.LoggingService.data.next(this.mobileView);
      console.log("Screen Width Resize",this.screenWidth)
  }
  checkMobileView(size){
    if(size < 480){
      this.mobileView = true;
    }else{
      this.mobileView = false
    }
  }
  detectCollapsedAction = (event : boolean) =>{
    if(event){
      this.isCollapsed = true;
    }else{
      this.isCollapsed = false;
    }
  }
}