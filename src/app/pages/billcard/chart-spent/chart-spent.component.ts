import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { orders, products, customers, refunds, seriesTemplate } from '../dashboard.data';
import { analytics } from '../dashboard.data';
import { BillCardMonth } from '../billcardmonth.model';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-chart-spent',
  templateUrl: './chart-spent.component.html',
  styleUrls: ['./chart-spent.component.scss']
})
export class ChartSpentComponent implements OnInit, AfterViewInit { 
  @Output() selectMonthEvent = new EventEmitter<Date>();
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

  /* expanseByMonth*/ 
  private _expanseByMonth:Array<BillCardMonth>;

  @Input() set expanseByMonth(expanseByMonth: Array<BillCardMonth>) {
    this._expanseByMonth = expanseByMonth;
    this.datasByMonth = this.expanseByMonth;

  }

  get expanseByMonth(): Array<BillCardMonth> {
    return this._expanseByMonth;
  }
  
  
  public colorScheme = {
    domain: ['#283593', '#039BE5', '#FF5252']
  }; 

  public autoScale = true;
  public datasByMonth = Array<BillCardMonth>();
  public gradient = false;
  public roundDomains = true;
  public showXAxis = true;
  public showYAxis = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public xAxisLabel = 'Year';
  public yAxisLabel = 'Profit';

  private _rows:any;

  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 

  constructor() { }

  /* EVENTS */
  ngOnInit() {
    this.datasByMonth = this.buildExpanseByMonthGraph(this.expanseByMonth);
    
  }

  ngAfterViewInit() {
  }

  onSelect(event) {
    let d:Date = event.name;
    this.selectMonthEvent.emit(d);

    console.log(event + " -- " + d.getFullYear());
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      //this.analytics = [...analytics];
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;

  }

  initSeries(name:string):any {
    let datas = {};
    datas["name"] = name;
    datas["series"] = [];
    return datas;
  }
  /* FUNCTIONS */
  buildExpanseByMonthGraph(items:Array<BillCardMonth>):any  {

    let graph:any = [];
    graph.push(this.initSeries("UBS"));
    graph[0].series.length = 0;

    // graph series
    items.forEach(card => {
      if (card.carte === "UBS") {
        let mntStr:string = String(card.montant.toFixed(2));
        graph[0].series.push({"name": card.date, "value": mntStr, "date": card.date});
      }
    });
    // sorting graph series
    graph[0].series.sort(
      (val1 : Object, val2 : Object) => {
      if (val2["date"] < val1["date"]) {
        return 1;
      }
      else if (val2["date"] > val1["date"]) {
        return -1;
      }
      else {
        return 0
      }
    });

    /**
     * Aga card
     */

    let datasAga = this.initSeries("Oney");
    items.forEach(card => {
      if (card.carte === "Aga") {
        let mntStr:string = String(card.montant.toFixed(2));
        datasAga["series"].push({"name": card.date, "value": mntStr, "date": card.date});
      }
    });
    graph.push(datasAga);

    /**
     * COOP card
     */
    let datasCoop = this.initSeries("Coop");
    items.forEach(card => {
      if (card.carte === "COOP") {
        let mntStr:string = String(card.montant.toFixed(2));
        datasCoop["series"].push({"name": card.date, "value": mntStr, "date": card.date});
      }
    });
    graph.push(datasCoop);

    
      debugger;

    return graph;
  }

  dateTickFormatting(val: any): string {
    if (val instanceof Date) {
      var options = { month: 'short' , year: '2-digit'};
      return (<Date>val).toLocaleString('fr-FR', options);
    }
  }
  yTickFormatting(val: any): string {
    return val.toLocaleString('fr-FR');
  }

  

}