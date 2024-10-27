import { Component, Input,OnInit } from '@angular/core';
import {general,navbarmenu} from '../reusable_config/sidenav'

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  @Input() isCollapsed = false;
  shorTitle : string = general.shortTitle;
  appIcon : string = general.appIcon;
  navbarMenu : Array<any > = navbarmenu;
}
