import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../config/interfaces/IProduct";
import {DataBaseService} from "../../services/db/data-base.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
	products$: Observable<IProduct[]>;
	connectError: boolean = false;
	connectDone: boolean = false;

  constructor(public dbService: DataBaseService) {}

  ngOnInit() {
	  this.products$ = this.dbService.selectDB<IProduct>('product');
  }

  addDelivery(form) {
	  this.dbService.addNewDelivery({
		  date: Date.now().toString(),
		  idProduct: JSON.parse(form.value.products).id,
		  isSupply: form.value.supply !== 'false',
		  weight: form.value.weight,
		  provider: form.value.provider,
		  storage: form.value.storage,
		  standard: form.value.waste ? 100 - form.value.waste - form.value.big - form.value.small : null,
		  waste: form.value.waste || null,
		  big: form.value.big || null,
		  small: form.value.small || null,
		  fraction: form.value.fraction || null,
	  }, JSON.parse(form.value.products))
		  .then(() => this.connectDone = true)
		  .catch(() => this.connectError = true)
	  ;
	  setTimeout(() => {
	  	this.connectDone = false;
	  	this.connectError = false;
	  }, 4000);
	  form.reset();
  }
}
