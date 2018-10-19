import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import {StoreService} from "../../services/store/store.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	deliveries$: Observable<IDelivery[]>;
	productList: IProduct[];
	products$: Observable<IProduct[]>;

	constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
    this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery');
	  this.products$ = this.dbService.selectDB<IProduct>('product');
	  this.products$.forEach(i => {
		  this.storeService.setProductList(i);
		  this.productList = i;
	  })
  }

	findProductName(id) {
		return this.productList.find(item => item.id === id).name;
	}
}
