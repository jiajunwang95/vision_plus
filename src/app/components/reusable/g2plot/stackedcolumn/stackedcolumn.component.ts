import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-stackedcolumn',
  templateUrl: './stackedcolumn.component.html',
  styleUrls: ['./stackedcolumn.component.scss']
})
export class StackedcolumnComponent implements OnInit, OnChanges {
  @ViewChild('container', {static : true}) container : any;
  plot;
  plotConfig : any ;
 @Input() width : string = '800';
 @Input() height : string = '400';

 ngOnInit() :void {
  this.init();
 }

 ngOnChanges(changes : SimpleChanges) : void {

 }
//To render the graph....
 init(){

  //this.plot = new Column(this.container.nativeElement,this.plotConfig);
  // this.plot.render()
 }

 update(){
  this.plot.update({
    ...this.plotConfig
  })
 }
}
