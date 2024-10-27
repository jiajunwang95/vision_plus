import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import _ from 'lodash'
import { combineLatest } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(private router: Router,private activatedRoute: ActivatedRoute,
    private LogingService : LoggingService
  ) {}
  mobileView : boolean = false;
  imageSize = {
    MOBILE : '12',
    DEFAULT : '24'
  }
  ngOnInit(): void {
    combineLatest([
      this.LogingService.data,
    ]).subscribe(res =>{
      console.log("What is res",res);
      this.mobileView = res[0];
    })
  }

}
