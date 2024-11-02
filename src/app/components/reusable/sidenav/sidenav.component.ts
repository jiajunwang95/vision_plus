import { Component, Input,OnInit } from '@angular/core';
import {general,navbarmenu} from '../../component_config/sidenav'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isCollapsed = false;
  shorTitle : string = general.shortTitle;
  appIcon : string = general.appIcon;
  navbarMenu : Array<any > = navbarmenu;


}
