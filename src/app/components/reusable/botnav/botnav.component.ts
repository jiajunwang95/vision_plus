import { Component, Input,OnInit } from '@angular/core';
import {general,navbarmenu} from '../../component_config/sidenav'

@Component({
  selector: 'app-botnav',
  templateUrl: './botnav.component.html',
  styleUrls: ['./botnav.component.scss']
})
export class BotnavComponent {
  navbarMenu : Array<any> = navbarmenu;
  @Input() maxboxes : number = 3;

  generateDivSpan(){
    return 24/Math.min(this.maxboxes,navbarmenu.length);
  }
}
