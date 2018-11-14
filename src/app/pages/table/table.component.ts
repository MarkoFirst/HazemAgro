import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import {StoreService} from "../../services/store/store.service";
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IMyUser} from "../../config/interfaces/IMyUser";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	@LocalStorage userInMyApp: IMyUser;

	deliveries$: Observable<IDelivery[]>;
	productList: IProduct[];
	products$: Observable<IProduct[]>;
	p: number;

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

	setCost(delivery: IDelivery) {
		if (!this.userInMyApp.isAdmin) return;

		const update = {};
		const newCost = prompt('How much?', '');
		update['delivery/' + delivery.id + '/cost'] = newCost || delivery.cost;
		this.dbService.updateDB(update);
	}
}
