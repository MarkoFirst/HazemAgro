import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import {StoreService} from "../../services/store/store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	deliveries$: Observable<IDelivery[]>;
	products$: Observable<IProduct[]>;
	prosuctList: IProduct[];

	isShowSrorData: boolean = false;
	left: number = 1000;
	top: number = 0;

	constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
	  this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery');
	  this.products$ = this.dbService.selectDB<IProduct>('product');
	  this.products$.forEach(i => {
		  this.storeService.setProductList(i);
		  this.prosuctList = i;
	  })
  }

	showStorData(event) {
		this.isShowSrorData = true;
		this.left = event.x;
		this.top = event.y;
	}

	noneStorData() {
		this.isShowSrorData = false;
	}
}
