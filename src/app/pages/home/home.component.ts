import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material';
import { PDFDialogComponent } from './pdf-dialog/pdf-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows = [];
  domains = [];
  loadingIndicator: boolean = true;

  constructor(public dialog: MatDialog) { 
    this.fetch((data) => {
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
    var currentMonth=currentDate.getMonth()+1;

    var age:number = 0;
    if (currentMonth > 10 || (currentMonth === 9 && currentDate.getDate() > 18)) {
      age = currentYear - 1975;
    }
    else{
      age = currentYear - 1 - 1975;
    }

    return age;

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

  public openPDFDialog(){
    let dialogRef = this.dialog.open(PDFDialogComponent, {
        height: '90%', width: '95%'
    });

    dialogRef.afterClosed().subscribe(user => {
        // if(user){
        //     (user.id) ? this.updateUser(user) : this.addUser(user);
        // }
    });
}

}
