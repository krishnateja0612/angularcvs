import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Data} from './data.model';

@Injectable({
  providedIn: 'root'
})
export class CvsDataService {
  responseData: Data[] = [];
  // data: {accountName: string, availableCash: number, cashOne: number, cashTwo: number }[] = [];
  constructor(private http: HttpClient) { }
  getData() {
  return this.http.
   get<{ [key: string]: Data }>('https://cvs-app-94f32.firebaseio.com/Data.json').
    pipe(map ( responseData  => {
      const dataArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          dataArray.push({...responseData[key]});
        }
        }
      return dataArray;
    } ));
   }
}
