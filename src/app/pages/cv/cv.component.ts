import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  editing = {};
  rows : any = [];
  skills = [];
  trainings = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  showBackend: boolean = false;
  showFrontend: boolean = false;
  showTools: boolean = false;
  showIntegration: boolean = false;
  showAll:boolean = false;
  showExperiences:boolean = false;
  // basicRowHeight = 80;
  // fixedCols = 4;
  // fixedRowHeight = 100;
  // ratioGutter = 1;
  // fitListHeight = '400px';
  // ratio = '4:1';
  
  constructor() { 
  }

  tiles: {text: string, cols: number, rows: number, color: string}[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  dogs: {name: string, human: string}[] = [
    {name: 'Porter', human: 'Kara'},
    {name: 'Mal', human: 'Jeremy'},
    {name: 'Koby', human: 'Igor'},
    {name: 'Razzle', human: 'Ward'},
    {name: 'Molly', human: 'Rob'},
    {name: 'Husi', human: 'Matias'},
  ];



  addTileCols() { this.tiles[2].cols++; }










  ngOnInit() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/cv.json');
    req.onload = () => {

      data(JSON.parse(req.response));
    };
    req.send();
  }

  getYears(value) {
    var nb = 0;
    var array = value.split(';');
    array.forEach(element => {
      var i = element.indexOf("-");
      if (i > -1) {
        var arrayYear = element.split('-');
        var end = arrayYear[1];
        if (end === "NOW") {
          var currentDate=new Date();
          var currentYear=currentDate.getFullYear();

          end = currentYear;
        }
        var begin = arrayYear[0];
        nb += end-begin;
        console.log("end:" + end + " begin:" + begin);

      }
      nb++;
      console.log(element);
    });
    return nb;//value + 
  }

  getTooltip(value) {
    var re = /NOW/gi; 
    var newstr = value.replace(re, "aujourd'hui"); 

    return newstr;

  }

  openExperiencesAll() {
    this.showExperiences = true;
  }
  closeExperiencesAll() {
    this.showExperiences = false;
  }


  openAll() {
    this.showAll = true;
    this.showBackend = true;
    this.showFrontend = true;
    this.showTools = true;
    this.showIntegration = true;
  
  }
  closeAll() {
    this.showAll = false;

    this.showBackend = false;
    this.showFrontend = false;
    this.showTools = false;
    this.showIntegration = false;
  
  }

  getSkillsImage (skill) {
    return "assets/img/skills/" + skill + ".png";
  }
}
