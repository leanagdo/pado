import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows = [];
  domains = [];
  loadingIndicator: boolean = true;

  constructor() { 
    this.fetch((data) => {
      debugger;
      this.rows = data;
      this.domains = data.domains;
      
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  ngOnInit() {
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/home-domain.json');
    req.onload = () => {

      data(JSON.parse(req.response));
    };
    req.send();
  }

  getAge() {
    var currentDate=new Date();
    var currentYear=currentDate.getFullYear();

    return currentYear - 1975;

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
}
