import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import _ from 'lodash'
import { combineLatest } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { imageSize } from '../component_config/element';
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
  imageSize = imageSize
  ngOnInit(): void {
    combineLatest([
      this.LogingService.data,
    ]).subscribe(res =>{
      console.log("What is res",res);
      this.mobileView = res[0];
    })
  }

}
