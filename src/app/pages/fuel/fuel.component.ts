import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { FuelService } from './fuel.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Fuel } from "./fuel.model";
import 'rxjs/add/operator/map';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
      this.temp = items;
      this.rows = items;
      setTimeout(() => { this.loadingIndicator = false; }, 500);
    });
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
