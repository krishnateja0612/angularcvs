import {Component, Injectable, OnInit} from '@angular/core';
import {CvsDataService} from './cvs-data.service';
import {Data} from './data.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'CVS-APP';
  shownumberofRows = 3;
  showLoadMore = true;
  ascendingCash = true;
  data: Data[] = [];
  constructor(private cvsData: CvsDataService, private http: HttpClient) {
  }
  ngOnInit() {
      this.onGetData();
  }
  onGetData() {
    this.cvsData.getData().subscribe(responses => {
      this.data = responses;
    });
  }
  onClickLoadMore() {
     console.log('clicked');
     this.shownumberofRows = this.data.length;
     this.showLoadMore = false;
  }
  onSortCash() {
    console.log('Sorting cash...');
    this.ascendingCash = !this.ascendingCash;
    if ( !this.ascendingCash ) {
      this.data.sort((a, b) => a.availableCash - b.availableCash);
    } else {
      this.data.sort((a, b) => b.availableCash - a.availableCash);
    }
  }
  onSortAccount() {
    console.log('Sorting acc number...');
    this.data.sort((a, b) => {
      return parseInt(a.accountName.split('-')[1] , 10) - parseInt(b.accountName.split('-')[1] , 10);
    });
  }
}
