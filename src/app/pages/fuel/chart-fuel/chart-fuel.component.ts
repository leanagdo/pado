import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { analytics } from '../dashboard.data';

@Component({
  selector: 'app-chart-fuel',
  templateUrl: './chart-fuel.component.html'
})
export class ChartFuelComponent implements OnInit {

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

  /* _fuelEvolution*/ 
  private _datas:Array<any>;

  @Input() titleGraph: string;

  @Input() set datas(datas: any) {
    this._datas = datas;
  }

  get datas(): any {
    return this._datas;
  }

    /* _fuelEvolution*/ 
    private _expanseDatas:Array<any>;

    @Input() set expanseDatas(expanseDatas: any) {
      this._expanseDatas = expanseDatas;
    }
  
    get expanseDatas(): any {
      return this._expanseDatas;
    }
  
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 

  constructor() { }

  ngOnInit() {
    this.analytics = analytics; 

  }

  onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      this.analytics = [...analytics];
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;

    console.log(this.datas);

  }

}
