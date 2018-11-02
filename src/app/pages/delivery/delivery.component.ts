import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../config/interfaces/IProduct";
import {DataBaseService} from "../../services/db/data-base.service";
import {NgForm} from "@angular/forms";
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IMyUser} from "../../config/interfaces/IMyUser";

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

	@LocalStorage userInMyApp: IMyUser;

	products$: Observable<IProduct[]>;
	connectError: boolean = false;
	connectDone: boolean = false;

	maxWeight: number = 100;

	constructor(public dbService: DataBaseService) {}

	ngOnInit() {
		this.products$ = this.dbService.selectDB<IProduct>('product');
	}

	addDelivery(form: NgForm) {
		if (form.invalid ||
			(form.value.supply !== 'false' && form.value.waste + form.value.small + form.value.big > 100)
		) return;

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
			user: this.userInMyApp.name
		}, JSON.parse(form.value.products));

		this.connectDone = true;
		form.reset();

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);
	}
}
