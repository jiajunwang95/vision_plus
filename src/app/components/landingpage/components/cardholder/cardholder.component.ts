import { Component, OnInit,Input } from '@angular/core';
import { Router} from "@angular/router"
import _ from 'lodash'
import { combineLatest } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
@Component({
  selector: 'app-cardholder',
  templateUrl: './cardholder.component.html',
  styleUrls: ['./cardholder.component.scss']
})
export class CardholderComponent {
  constructor(private router: Router,
    private LogingService : LoggingService
  ) {}
  imageSize = {
    MOBILE : '14',
    DEFAULT : '18'
  }
  @Input() mobileView : boolean;
  ngOnInit(): void {

  }
}
