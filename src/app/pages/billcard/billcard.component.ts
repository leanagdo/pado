import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { BillCardService } from './billcard.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BillCard } from "./billcard.model";
import 'rxjs/add/operator/map';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BillCardMonth } from './billcardmonth.model';
import { Category } from './category.model';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-billcard',
  templateUrl: './billcard.component.html',
  styleUrls: ['./billcard.component.scss'],
  providers: [ BillCardService ]
})

export class BillCardComponent implements OnInit, AfterViewInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  selectedCategory:any;

  rows:Array<BillCard> = [];
  temp:Array<BillCard> = [];
  selected = [];
  limitTable = 10;
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
  public items: Array<BillCard>;
  dataId: string;
  customersObservable : Observable<Object[]>;
  expanseByMonth = Array<BillCardMonth>();
  expanseByMonthGraph = Array<BillCardMonth>();
  categories = Array<Category>();
  monthTotalAmount:number;

  constructor(private httpClient:HttpClient, private service: BillCardService) {
  }

  /* EVENTS */
  ngOnInit() {
    console.log("ngOnInit" + new Date());
    this.service.loadDpak$().subscribe((items: BillCard[]) => {
      this.temp = items;
      this.rows = items;
      setTimeout(() => { this.loadingIndicator = false; }, 500);

      var itemDesc = this.sortByDateDesc(this.rows);
  
      this.expanseByMonth = this.buildExpanseByMonth(itemDesc);
      //this.expanseByMonthGraph = this.buildExpanseByMonthGraph(this.expanseByMonth);
      this.categories = this.buildCatogoryList(this.expanseByMonth);
      this.selectedCategory = this.categories[0].categoryDate;
      //this.changeMonth(this.selectedCategory);  

    });
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit" + new Date());
    this.selectedCategory = this.categories[0].categoryDate;

  }


  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  onMonthChanged(event:MatSelectChange) {
    this.changeMonth(event.value);  
  }

  onSelectMonthEvent(event:Date) {
    this.changeMonth(event);  
  }

  /**
   *  FUNCTIONS
   */

  buildCatogoryList(expanseByMonth: Array<BillCardMonth>) : Array<Category> {
    let results:Array<Category> = [];

    expanseByMonth.forEach(item => {
      if ((!this.isCategoryInArray(results, item))) {
        let c:Category = new Category();
        c.categoryName = this.dateTickFormatting(item.date);
        c.categoryValue = this.dateTickFormatting(item.date);
        c.categoryDate = item.date;
        
        results.push(c);
  
      }
    });

    // if (results && results.length > 0) {
    //   this.initDatas(results[0].categoryDate);
    // }
    return results;
  }

  isCategoryInArray(array:Array<Category>, value:BillCardMonth) {
    return !!array.find(item => {return item.categoryDate.getTime() == value.date.getTime()});
  }


  buildExpanseByMonth(items:Array<BillCard>): Array<BillCardMonth> {
    let dayArray: Array<BillCardMonth> = [];
    let returnArray: Array<BillCardMonth> = [];

    let datesArray: Array<BillCardMonth> = [];

    items.forEach(card => {

      if (true ) {
        let billcardmonth:BillCardMonth = new BillCardMonth();
  
        let y:string = card.date.substr(0,4);
        let m:string = card.date.substr(5,2);
        let d:string = card.date.substr(8,2);
  
        billcardmonth.date = new Date(Number(card.date.substr(0,4)), Number(card.date.substr(5,2))-1, Number(card.date.substr(8,2)));
        billcardmonth.montant = Number(card.montant);//Number(card.montant.replace(',','.'));
        dayArray.push(billcardmonth);
  
        let date01:Date = billcardmonth.date;
        date01.setDate(1);
        let bcm:BillCardMonth = new BillCardMonth();
        bcm.carte  = card.carte;
        bcm.date = date01;
        bcm.montant = billcardmonth.montant;

        if (this.isInArray(datesArray,bcm)) {
          let updateItem:BillCardMonth  = datesArray.find(item => item.date.getTime() == bcm.date.getTime());
          let index = datesArray.indexOf(updateItem);
      
          updateItem.montant = updateItem.montant + bcm.montant;
          datesArray[index] = updateItem;
      

          console.log("montant:" + bcm.montant);
        }
        else {
          datesArray.push(bcm);
        }
      }
    })

    return datesArray;
  };

  changeMonth(selectedDate:Date) {
    this.limitTable = 100;

    // on se base sur donnée temporaire pour filter la liste
    this.rows = this.temp.filter(row => {
      return row.dateType.getFullYear() == selectedDate.getFullYear() && row.dateType.getMonth() == selectedDate.getMonth();
    })

    this.monthTotalAmount = 0;
    this.rows.forEach(row => {
      this.monthTotalAmount += Number(row.montant); 
    })

    this.selectedCategory = selectedDate;//this.categories[5].categoryDate;
  }

  dateTickFormatting(val: any): string {
    if (val instanceof Date) {
      var options = { month: 'short' , year: 'numeric'}; // year : numero or 2-digit
      return (<Date>val).toLocaleString('fr-FR', options);
    }
  }

  isInArray(array:Array<BillCardMonth>, value:BillCardMonth) {
    return !!array.find(item => {return item.carte == value.carte && item.date.getTime() == value.date.getTime()});
  }
  


  sortByDateDesc(items:Array<BillCard>):Array<BillCard> {
    return items = items.sort(
      (val1 : BillCard, val2 : BillCard) => {
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return (d.date.toLowerCase().indexOf(val) !== -1) || (d.description.toLowerCase().indexOf(val) !== -1) || (d.ordre.toLowerCase().indexOf(val) !== -1) || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }


  eraseFilter() {
    this.selectedCategory = null;
    this.limitTable = 10;
    this.rows = this.temp.filter(row => {
      return row;
    })

  }

  /**
   * Styles
   */
  // getRowClass(row): string {
  //   return 'row-color';
  // }
  
//   getRowClass = (row) => {
//     return {
//       'row-color': true
//     };
//  }
 
getRowClass(row) {
  return {
    'age-is-ten': true,//(row.montant % 10) === 0
  };
}

getCellClass({ row, column, value }): any {
  return {
    'is-female': value === 'female'
  };
}

}
