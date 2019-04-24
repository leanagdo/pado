import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { disk_space } from '../dashboard.data';
import { BillCardMonth } from '../billcardmonth.model';
import { Category } from '../category.model';
import { BillCard } from '../billcard.model';
import { MatSelectChange } from '@angular/material';
import { CategoryAmount } from '../category-amount.model';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-spent-by-category',
  templateUrl: './spent-by-category.component.html'
})

export class SpentByCategoryComponent implements OnInit, AfterViewInit, AfterContentInit {
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  }; 
  public data: any[]; 
  public doughnut = false; 
  public gradient = true;
  public explodeSlices = true;
  public selected:any;
  public selectedMonth:Array<BillCard> = [];
  public showLegend = false;
  public showLabels = true;

  /* expanseByMonth */ 
  private _expanseByMonth:Array<BillCardMonth>;

  @Input() set expanseByMonth(expanseByMonth: Array<BillCardMonth>) {
    this._expanseByMonth = this.sortByDateDesc(expanseByMonth);
  }

  get expanseByMonth(): Array<BillCardMonth> {
    return this._expanseByMonth;
  }

  /* categories */ 
  private _categories:Array<Category>;

  @Input() set categories(categories: Array<Category>) {
    this._categories = categories;
  }
  get categories(): Array<Category> {
    return this._categories;
  }
  private _rows:Array<BillCard>;
  /**
   * Rows that are displayed in the table.
   */
  @Input() set rows(val: Array<BillCard>) {
    this._rows = val;

    //this.categories = this.buildCatogoryList(this._expanseByMonth);
    this.selected = this.categories[0].categoryDate;
  }

  /**
   * Gets the rows.
   */
  get rows(): Array<BillCard> {

    return this._rows;
  }


  private rowsOriginal:Array<BillCard>;
  
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  
  constructor() { }

  private originalRows:Array<BillCard> = [];
  /**
   * EVENTS
   */
  ngOnInit(){
    console.log("onNgInit");

  }
  
  ngAfterViewInit() {
    console.log("ngAfterViewInit");

    this.originalRows = Object.create(this.rows);
    this.initDatas(this.selected);

  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  public onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      //setTimeout(() => this.data = [...disk_space] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

  onMonthChanged(item:MatSelectChange) {
    this.selectedMonth = [];
    this.initDatas(item.value);
  }


  /**
   * FUNCTIONS
   */
  buildCatogoryList(expanseByMonth: Array<BillCardMonth>) : Array<Category> {
    let results:Array<Category> = [];

    expanseByMonth.forEach(item => {
      let c:Category = new Category();
      c.categoryName = this.dateTickFormatting(item.date);
      c.categoryValue = this.dateTickFormatting(item.date);
      c.categoryDate = item.date;
      
      results.push(c);
    });

    if (results && results.length > 0) {
      this.initDatas(results[0].categoryDate);
    }
    return results;
  }

  dateTickFormatting(val: any): string {
    if (val instanceof Date) {
      var options = { month: 'long' , year: '2-digit'};
      return (<Date>val).toLocaleString('fr-FR', options);
    }
  }

  initDatas(date:Date) {
    this.originalRows.map((el) => this.retrieveDataOnMonth(el, date));

    let catArray: Array<CategoryAmount> = [];

    this.selectedMonth.forEach(card => {

        if (this.isInArray(catArray,card.categorie)) {
          let updateItem:CategoryAmount  = catArray.find(item => item.name == card.categorie);
          let index = catArray.indexOf(updateItem);
      
          updateItem.value = updateItem.value + Number(card.montant);
          catArray[index] = updateItem;
      

          console.log("montant:" + card.montant);
        }
        else {
          let categoryAmount:CategoryAmount = new CategoryAmount();
          categoryAmount.name = card.categorie;
          categoryAmount.value = Number(card.montant);
          catArray.push(categoryAmount);
        }
      }
    )

    this.data = catArray;

  }

  isInArray(array:Array<CategoryAmount>, value:string) {
    return !!array.find(item => {return item.name == value});
  }

  retrieveDataOnMonth(element:BillCard, item:Date) { 

    if (element.dateType.getFullYear() == item.getFullYear() && element.dateType.getMonth() == item.getMonth())
      this.selectedMonth.push(element);
      return element; 
  } 
 

  sortByDateDesc(items:Array<BillCardMonth>):Array<BillCardMonth> {
    return items = items.sort(
      (val1 : BillCardMonth, val2 : BillCardMonth) => {
        if (val2.date > val1.date) {
          return 1;
        }
        else if (val2.date < val1.date) {
          return -1;
        }
        else {
          return 0;
        }
      });
  }



}