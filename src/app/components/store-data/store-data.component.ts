import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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

	@Input() idStore: number;

	storages$: Observable<IStorage[]>;
	productList: IProduct[];
	storageList: number = 0;

  constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
	  this.storages$ = this.dbService.selectDB<IStorage>('storage');
	  this.storeService.productList.subscribe(i => this.productList = i);
  }

	objectKeys(obj) {
		this.storageList = Object.keys(obj).length;
    return obj ? Object.keys(obj) : null;
  }

  getProductName(key) {
	  return this.productList[this.productList.findIndex(i => i.id === key)].name;
  }
}
