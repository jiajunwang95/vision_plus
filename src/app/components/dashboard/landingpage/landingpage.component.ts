import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import _ from 'lodash'
import { combineLatest } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { imageSize } from 'src/app/components/component_config/element';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ClarityModule } from '@clr/angular';

/**Fake data */
import {summarydata} from "src/app/fakedata/summary.data";
@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule,NzLayoutModule,NzGridModule,ClarityModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  constructor(private router: Router,private activatedRoute: ActivatedRoute,
    private LogingService : LoggingService
  ) {}
  mobileView : boolean = false;
  imageSize = imageSize;
  summarydata = summarydata;
  COLUMN_HEADER = ["PROD","UAT"];
  ngOnInit(): void {
    combineLatest([
      this.LogingService.data,
    ]).subscribe(res =>{
      console.log("What is res",res,"summarydata",summarydata);
      this.mobileView = res[0];
    })
  }
  generateSpan(len){
    if(len <= 2){
      return 12;
    }else{
      return 8
    }
  }

}
