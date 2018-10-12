import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {IStorage} from "../../config/interfaces/IStorage";
import {StoreService} from "../../services/store/store.service";
import {IProduct} from "../../config/interfaces/IProduct";

@Component({
  selector: 'app-store-data',
  templateUrl: './store-data.component.html',
  styleUrls: ['./store-data.component.css']
})
export class StoreDataComponent implements OnInit {

	products$: Observable<IStorage[]>;
	productList: IProduct[];

  constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
	  this.products$ = this.dbService.selectDB<IStorage>('storage');
	  this.storeService.productList.subscribe(i => this.productList = i);
  }

	objectKeys(obj) {
    return Object.keys(obj);
  }

  getProductName(key) {
	  return this.productList[this.productList.findIndex(i => i.id === key)].name;
  }
}
