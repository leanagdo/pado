import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { orders, products, customers, refunds } from '../dashboard.data';
import { analytics } from '../dashboard.data';

@Component({
  selector: 'app-chart-spent',
  templateUrl: './chart-spent.component.html',
  styleUrls: ['./chart-spent.component.scss']
})
export class ChartSpentComponent implements OnInit { 

  private _rows:any;
    /**
   * Rows that are displayed in the table.
   */
  @Input() set rows(val: any) {
    this._rows = val;

  }

  /**
   * Gets the rows.
   */
  get rows(): any {

    return this._rows;
  }

  


  public analytics: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = false;
  public xAxisLabel = 'Year';
  public showYAxisLabel = false;
  public yAxisLabel = 'Profit';
  public colorScheme = {
    domain: ['#283593', '#039BE5', '#FF5252']
  }; 
  public autoScale = true;
  public roundDomains = true;
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 

  constructor() { }

  ngOnInit() {
    this.analytics = analytics; 
    debugger;
  
  }

  onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      this.analytics = [...analytics];
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}