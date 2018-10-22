import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../config/interfaces/IProduct";
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";

@Component({
	selector: 'app-internal-movement',
	templateUrl: './internal-movement.component.html',
	styleUrls: ['./internal-movement.component.css']
})
export class InternalMovementComponent implements OnInit {

	products$: Observable<IProduct[]>;
	connectError: boolean = false;
	connectDone: boolean = false;
	formValue: any;

	constructor(public dbService: DataBaseService) {
	}

	ngOnInit() {
		this.products$ = this.dbService.selectDB<IProduct>('product');
	}

	move(form) {
		if (form.invalid) return;

		this.formValue = form.value;

		this.dbService.selectDB(
			`storage/${InternalMovementComponent.getStorageName(this.formValue.storage)}/filling/${this.formValue.product}`
		).first()
			.subscribe((data: number[]) => {
				const product = {};

				console.log(this.formValue);

				product[`/storage/${InternalMovementComponent.getStorageName(this.formValue.storage)}/filling/${this.formValue.product}/${this.formValue.fraction}`] =
					data[InternalMovementComponent.getFractionIndex(this.formValue.fraction)] - this.formValue.weight;

				return this.dbService.updateDB(product).then(() => {
					this.dbService.selectDB(
						`storage/${InternalMovementComponent.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product}`
					).first()
						.subscribe((data: number[]) => {
							const productTo = {};

							productTo[`/storage/${InternalMovementComponent.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product}/${this.formValue.fraction}`] =
								data[InternalMovementComponent.getFractionIndex(this.formValue.fraction)] + this.formValue.weight;

							return this.dbService.updateDB(productTo).then(() => {
							});
						});
				}).then(() => this.connectDone = true)
					.catch(() => this.connectError = true)
			});

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);
		form.reset();
	}

	static getStorageName(num) {
		switch (num) {
			case '1':
				return 'first';
			case '2':
				return 'second';
			case '3':
				return 'third';
		}
	}

	static getFractionIndex(fraction) {
		switch (fraction) {
			case 'big':
				return 0;
			case 'small':
				return 1;
			case 'standard':
				return 2;
			case 'waste':
				return 3;
		}
	}
}
