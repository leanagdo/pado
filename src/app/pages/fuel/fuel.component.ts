import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { FuelService } from './fuel.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Fuel } from "./fuel.model";
import { FuelEvolution } from "./fuel.evolution.model";
import { KmEvolution } from "./fuel.kilometer.model";
import { Expanse } from "./fuel.expanse.model";
import 'rxjs/add/operator/map';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss'],
  providers: [ FuelService ]
})

export class FuelComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  fuelEvolution = Array<FuelEvolution>();
  kmEvolution = Array<KmEvolution>();
  expanseDatas = Array<any>();
  kmDatas = Array<any>();
  
  lastUpdateDate:Date ;
  lastUpdateKm = "";
  lastUpdatePriceLiter:number ;

  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { prop: 'carte' },
    { name: 'categorie' },
    { name: 'date' },
    { name: 'description' },
    { name: 'montant' },
    { name: 'ordre' }
  ];

  data: any = null;

  public settings: Settings;
  public items: Array<Fuel>;
  dataId: string;
  customersObservable : Observable<Object[]>;

  constructor(private httpClient:HttpClient, private service: FuelService) {

  }

  ngOnInit() {

    this.service.loadDpak$().subscribe((items: Fuel[]) => {


      var datePipe = new DatePipe('fr-FR');




      var lastFuel:Fuel = items[0];
debugger;
      this.lastUpdateDate = new Date(lastFuel.date) ;
      this.lastUpdateKm = lastFuel.kilometrage;
      var price:number = Number(lastFuel.montant.replace(",",".")) / Number(lastFuel.litre.replace(",","."));
      this.lastUpdatePriceLiter = this.around2digit(price);

      this.temp = items;
      this.rows = items;

      var itemsAsc = this.sortByDateAsc(items);
      var itemsDesc = this.sortByDateDesc(items);

      this.fuelEvolution = this.buildFuelEvolution(itemsAsc);//returnArray;
      this.kmEvolution = this.buildKmEvolution(itemsAsc);
      this.expanseDatas = this.buildExpanseDatas(itemsAsc);
      this.kmDatas = this.buildKmDatas(itemsAsc);
      
      setTimeout(() => { this.loadingIndicator = false; }, 500);
    });
  }

  sortByDateDesc(items:Array<Fuel>):Array<Fuel> {
    return items = items.sort(
      (val1 : Fuel, val2 : Fuel) => {
        if (val2.dateType > val1.dateType) {
          return 1;
        }
        else if (val2.dateType < val1.dateType) {
          return -1;
        }
        else {
          return 0;
        }
      });
  }
  sortByDateAsc(items:Array<Fuel>):Array<Fuel> {
    return items = items.sort(
      (val1 : Fuel, val2 : Fuel) => {
        if (val2.dateType < val1.dateType) {
          return 1;
        }
        else if (val2.dateType > val1.dateType) {
          return -1;
        }
        else {
          return 0;
        }
      });
  }

  buildFuelEvolution(items:Array<Fuel>): Array<FuelEvolution> {
    let returnArray: Array<FuelEvolution> = [];

    items.forEach(fuel => {
      if (fuel.voiture == "CLA") {
        let fe:FuelEvolution = new FuelEvolution();
        fe.name = fuel.date;
  
        let y:string = fuel.date.substr(0,4);
        let m:string = fuel.date.substr(5,2);
        let d:string = fuel.date.substr(8,2);
  
        fe.date = new Date(Number(fuel.date.substr(0,4)), Number(fuel.date.substr(5,2)), Number(fuel.date.substr(8,2)));
        let montant:string = fuel.montant.replace(',','.');
        let litre:string = fuel.litre.replace(',','.');
  
        var liter:number = (Number(montant) / Number(litre));
        liter = liter * 100;  // 556.845
        liter = Math.round(liter); // 556
        liter = liter/100;         // 5.56
     
        fe.value = liter;//Number(montant) / Number(litre));
        returnArray.push(fe);
  
      }


    });

    return returnArray.sort(
      (val1 : FuelEvolution, val2 : FuelEvolution) => {
        if (val2.date < val1.date) {
          return 1;
        }
        else if (val2.date > val1.date) {
          return -1;
        }
        else {
          return 0
        }
      });
  }

around2digit(numberToconvert:number):number {
  var result:number = 0;
  result = numberToconvert * 100;  // 556.845
  result = Math.round(result); // 556
  result = result/100;         // 5.56

  return result;
}


  buildKmEvolution(items:Array<Fuel>): Array<any> {
    let tmp = [
      {
       name: 'Km',
       series: [
         {
           
         }
       ]
     }
    ]
  
    let returnArray: Array<KmEvolution> = [];

    let graph:any = tmp;
    graph[0].series.length = 0;

    items.forEach(fuel => {
      if (fuel.voiture === "CLA") {
        //console.log("date:"+fuel.date + "" + new Date(fuel.date));
        
        let date = new Date(fuel.date); //Number(fuel.date.substr(0,4)), Number(fuel.date.substr(5,2)), Number(fuel.date.substr(8,2)));
        graph[0].series.push({"name": date, "value": fuel.kilometrage, "date": date});
  
      }
    });

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
    

    return graph;
  }


  /* buildExpanseDatas */
  buildExpanseDatas(items:Array<Fuel>): Array<any> {
    let byYear = this.toGroupedDates(items);

   
    let graph:Array<Expanse> = new Array<Expanse>();

    byYear.forEach(element => {
      debugger;
        let expanse:Expanse = new Expanse();
        expanse.name = element.year;
        let amount = this.getTotalAmount(element.values);
        let liter = this.getTotalLiter(element.values);
        //let km = this.getTotalKm(element.values);

        let series = new Array();
        series.push({"name": "depenses", "value": amount});
        series.push({"name": "litres", "value": liter});
        //series.push({"name": "km", "value": km});
        expanse.series = series;

        //expanse.series = element.values.map(item => item.montant);
        graph.push(expanse);
    });


    return graph;
  }

  buildKmDatas(items:Array<Fuel>): Array<any> {
    let byYear = this.toGroupedDates(items);

    let graph:Array<Expanse> = new Array<Expanse>();

    byYear.forEach(element => {
      debugger;
        let expanse:Expanse = new Expanse();
        expanse.name = element.year;
        let maxkm:number = this.getMaxKm(element.values);
        let minkm:number = this.getMinKm(element.values);

        let series = new Array();
        series.push({"name": "km", "value": Math.floor(maxkm-minkm)});
        expanse.series = series;

        graph.push(expanse);
    });


    return graph;
  }

  getMaxKm(items:Array<Fuel>): number {
    debugger;
    var max = 0;
    if (items != null && items.length > 0) {      
      items.forEach(x => {
        if (Number(x.kilometrage) > (max)) {
          max = Number(x.kilometrage)
        }
        return max;
      });
    }
    return max;
  }  
  getMinKm(items:Array<Fuel>): number {
    debugger;
    var min = 999999;
    if (items != null && items.length > 0) {      
      items.forEach(x => {
        if (Number(x.kilometrage) < (min)) {
          min = Number(x.kilometrage)
        }
        return min;
      });
    }
    return min;
  }  

  getTotalLiter(items:Array<Fuel>): Number {
    var total = 0;
    if (items != null && items.length > 0) {      
      items.forEach(x => {
        return total = total + Number(x.litre.replace(",","."));
      });
    }
    return total;
  }  

  getTotalAmount(items:Array<Fuel>): Number {
    var total = 0;
    if (items != null && items.length > 0) {      
      items.forEach(x => {
        return total = total + Number(x.montant.replace(",","."));
      });
    }
    return total;
  }  

  private toGroupedDates(expanse : Array<Fuel>){

    // Extract year from arr
    let extractedYear = expanse.map((date) => {
      return date.dateType.getFullYear();
    });
  
    // Get just the year list
    let yearsArray = new Set(extractedYear);
  
  
    // Group by year
    let filteredByYears = [];
    yearsArray.forEach((year) => {
      filteredByYears.push({ 'year' : year, 'values' : expanse.filter((_year) => {
        return _year.dateType.getFullYear() == year; 
      })});
    });
    // .map((dd) => {
    //   var obj:Object = new Object();
    //   obj["sum"] += dd.montant; 
    //   console.log(dd);
    //   return obj;
    // })
    
    filteredByYears = filteredByYears.sort(
      (val1 : any, val2 : any) => {
        if (val2.year < val1.year) {
          return 1;
        }
        else if (val2.year > val1.year) {
          return -1;
        }
        else {
          return 0;
        }
      });
    return filteredByYears;
  }
  

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return (d.description.toLowerCase().indexOf(val) !== -1) || (d.ordre.toLowerCase().indexOf(val) !== -1) || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
