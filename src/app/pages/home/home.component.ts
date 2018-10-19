import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import {StoreService} from "../../services/store/store.service";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	deliveries$: Observable<IDelivery[]>;
	products$: Observable<IProduct[]>;
	productList: IProduct[];

	idStore: number = 4;

	constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
	  this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery', ref => ref.orderByChild('date'));

	  this.products$ = this.dbService.selectDB<IProduct>('product');
	  this.products$.forEach(i => {
		  this.storeService.setProductList(i);
		  this.productList = i;
	  })
  }

	showStorData(event, idStore) {
		this.idStore = this.idStore === idStore ? 4 : idStore;
		event.stopPropagation()
	}

	findProductName(id) {
		return this.productList.find(item => item.id === id).name;
	}
}
