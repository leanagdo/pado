import {Injectable} from '@angular/core';
import {Http, ResponseContentType} from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Fuel } from "./fuel.model";

/*
  Generated class for the GoogleDrive provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FuelService {
  data: any = null;

  constructor(public http: HttpClient) {

  }

  loadBill () {

  }
  
  public loadDpak$(): Observable<Fuel[]> {
    return this.http
    .get(
      'https://spreadsheets.google.com/feeds/list/148wnmoZGNxP5G_EukplLX2ANXRWDB-Dl9hUG2WgYkVw/od6/public/values?alt=json',
      {
        responseType: "json"
      }
    ).pipe(
      map((response: any) => {
      const arr:Array<any> = response.feed.entry as Array<any>;
      console.log(arr);

      const result: string = response;
      
      let returnArray: Array<Fuel> = [];
      if( arr && arr.length > 0 ) {
        arr.forEach( ( entry, index ) => {
          var obj = new Fuel();
          for( let x in entry ) {
            if( x.includes('gsx$') && entry[x].$t ){
              obj[x.split('$')[1]] = entry[x]['$t'];
              // console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
            }
          }
          returnArray.push( obj );
        });

      }   
      //let madate:Date = new Date(returnArray[0]["date"]);

     
      returnArray = returnArray.sort(
        (val1 : Fuel, val2 : Fuel) => {
          if (val2.date > val1.date) {
            return 1;
          }
          else if (val2.date < val1.date) {
            return -1;
          }
          else {
            return 0
          }

          //return <any>val2.date - <any>val1.date
        });

      //myArr.sort((val1, val2)=> {return new Date() (val2.CREATE_TS) - new 
      //  Date(val1.CREATE_TS)})
      debugger;

      console.log(returnArray);
      return returnArray;
 
    }
    ));
  }

  /*
  load( id ) {
    debugger;
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json'; 
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url)
        .map(res => res.json() )
        .subscribe( data => {
          console.log( 'Raw Data', data );
          this.data = data.feed.entry;
          
          let returnArray: Array<any> = [];
          if( this.data && this.data.length > 0 ) {
            this.data.forEach( ( entry, index ) => {
              var obj = {};
              for( let x in entry ) {
                if( x.includes('gsx$') && entry[x].$t ){
                  obj[x.split('$')[1]] = entry[x]['$t'];
                  // console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
                }
              }
              returnArray.push( obj );
            });
          }
          resolve(returnArray);
          debugger;
        });
    });
  }*/
}
