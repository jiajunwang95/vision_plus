import { Component } from '@angular/core';
import {general,navbarmenu} from '../../component_config/sidenav'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  shorTitle : string = general.shortTitle;
  appIcon : string = general.appIcon;
  navbarMenu : Array<any > = navbarmenu;
  isCollapsed : boolean = true;
  siderWidth : string = general.siderWidth;
  title : string = general.title;
  description : string = general.subtitle;
  mobileView : boolean = false;

  detectCollapsedAction = (event : boolean) =>{
    if(event){
      this.isCollapsed = true;
    }else{
      this.isCollapsed = false;
    }
  }


}
