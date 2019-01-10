import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { orders, products, customers, refunds } from '../dashboard.data';
import { Fuel } from '../fuel.model';

@Component({
  selector: 'app-info-fuel',
  templateUrl: './info-fuel.component.html',
  styleUrls: ['./info-fuel.component.scss']
})
export class InfoFuelComponent implements OnInit { 
  /* _fuelEvolution*/ 
  private _fuelEvolution:Array<any>;

  @Input() set fuelEvolution(fuelEvolution: any) {
    this._fuelEvolution = fuelEvolution;
    if (fuelEvolution !== 'undefined' && this._fuelEvolution.length > 0) {
      this.lastLiter = this._fuelEvolution[this._fuelEvolution.length-1].value;
      this.lastLiter = Number(this.lastLiter) * 100;  // 556.845
      this.lastLiter = Math.round(Number(this.lastLiter)); // 556
      this.lastLiter = Number(this.lastLiter)/100;         // 5.56
  
    }
  }

  get fuelEvolution(): any {

    return this._fuelEvolution;
  }
  /* _kmEvolution*/ 
  private _kmEvolution:Array<any>;

  @Input() set kmEvolution(kmEvolution: any) {
    this._kmEvolution = kmEvolution;
    //this.lastKm = this._kmEvolution[this._kmEvolution.length-1].value;
  }

  get kmEvolution(): any {

    return this._kmEvolution;
  }

  /* OTHER */

  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  
  public lastLiter: Number;
  public lastKm: Number;
  
  public colorScheme = {
    domain: ['#008000']
  }; 
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  public settings: Settings;
  constructor(public appSettings:AppSettings){
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(){
    this.orders = orders;
    this.products = products;
    this.refunds = refunds;
  }
  
  public onSelect(event) {
    console.log(event);
  }


  ngOnDestroy(){
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.orders = [...orders] ); 
      setTimeout(() => this.products = [...products] ); 
      setTimeout(() => this.customers = [...customers] ); 
      setTimeout(() => this.refunds = [...refunds] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

  dateTickFormatting(val: any): string {
    if (val instanceof Date) {
      var options = { month: 'short' , year: '2-digit'};
      return (<Date>val).toLocaleString('fr-FR', options);
    }
  }
  
}