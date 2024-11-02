import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';import {filter_config} from '../../component_config/element'
@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input() mobileView : boolean = false;
  @Input() displayFilter : boolean;
  @Input() PrimaryKey : string ;
  @Output() searchEvent = new EventEmitter<string>();
  selectedValue : any = null;
  listOfOption : any = [];
  filterObj = filter_config['ADMIN'];
  ngOnInit(): void{
    // console.log("What is filterObj",this.filterObj,"PrimaryKey",this.PrimaryKey);
  }
  searchSelected() : void {
    // console.log("What is selectedV",this.selectedValue);
    this.searchEvent.emit(this.selectedValue);
  }
}
