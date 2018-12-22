import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { disk_space } from '../dashboard.data';

@Component({
  selector: 'app-spent-by-category',
  templateUrl: './spent-by-category.component.html'
})
export class SpentByCategoryComponent implements OnInit {
  public data: any[]; 
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  }; 
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false; 
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  
  constructor() { }

  ngOnInit(){
    this.data = disk_space;  
  }
  
  public onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.data = [...disk_space] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}