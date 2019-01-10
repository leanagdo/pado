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

      return returnArray.filter(x => x.voiture === 'CLA');
    }
    ));
  }

  
}
