import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import "rxjs-compat/add/operator/map";
import {IProduct} from "../../config/interfaces/IProduct";
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IMyUser} from "../../config/interfaces/IMyUser";
import {IMovement} from "../../config/interfaces/IMovement";

@Component({
	selector: 'app-internal-movement',
	templateUrl: './internal-movement.component.html',
	styleUrls: ['./internal-movement.component.css']
})
export class InternalMovementComponent implements OnInit {

	@LocalStorage productListInApp: IProduct[];
	@LocalStorage userInMyApp: IMyUser;

	productsFirstStore$: Observable<IProduct[]>;
	productsSecondStore$: Observable<IProduct[]>;
	productsThirdStore$: Observable<IProduct[]>;
	connectError: boolean = false;
	connectDone: boolean = false;
	formValue: any;
	storageNow: any;

	constructor(public dbService: DataBaseService) {}

	ngOnInit() {
		this.productsFirstStore$ = this.dbService
			.selectDB(`storage/first`)
			.map(value => Object.keys(value[0]).map(key => {
				return this.productListInApp.find(item => item.id === key);
			}));
		this.productsSecondStore$ = this.dbService
			.selectDB(`storage/second`)
			.map(value => Object.keys(value[0]).map(key => {
				return this.productListInApp.find(item => item.id === key);
			}));
		this.productsThirdStore$ = this.dbService
			.selectDB(`storage/third`)
			.map(value => Object.keys(value[0]).map(key => {
				return this.productListInApp.find(item => item.id === key);
			}));
	}

	move(form) {
		if (form.invalid) return;

		this.formValue = form.value;
		this.formValue.product = JSON.parse(this.formValue.product);

		this.dbService.selectDB(
			`storage/${this.getStorageName(this.formValue.storage)}/filling/${this.formValue.product.id}`
		).first()
			.subscribe((data: number[]) => {
				const product = {};

				if (data[this.getFractionIndex(this.formValue.fraction)] < this.formValue.weight) {
					alert('There is no such quantity in stock!');
					return Error('There is no such quantity in stock!');
				}

				product[`/storage/${this.getStorageName(this.formValue.storage)}/filling/${this.formValue.product.id}/${this.formValue.fraction}`] =
					(data[this.getFractionIndex(this.formValue.fraction)] || 0) - this.formValue.weight;

				return this.dbService.updateDB(product).then(() => {
					this.dbService.selectDB(
						`storage/${this.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product.id}`
					).first()
						.subscribe((data: number[]) => {
							const productTo = {};

							productTo[`/storage/${this.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product.id}/${this.formValue.fraction}`] =
								(data[this.getFractionIndex(this.formValue.fraction)] || 0) + this.formValue.weight;

							return this.dbService.updateDB(productTo).then(() => {
							});
						});
				}).then(() => {
					this.connectDone = true;
					this.dbService.insertDB<IMovement>('movement', {
						date: Date.now(),
						product: this.formValue.product.name,
						weight: this.formValue.weight,
						fraction: this.formValue.fraction,
						movement: this.formValue.storage + ' -> ' + this.formValue.storageFor,
						user: this.userInMyApp.name
					});
				})
					.catch(() => this.connectError = true)
			});

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);
		form.reset();
	}

	getProducts(num) {
		switch (num) {
			case '1':
				return this.productsFirstStore$;
			case '2':
				return this.productsSecondStore$;
			case '3':
				return this.productsThirdStore$;
			default:
				return this.productsFirstStore$;
		}
	}

	getStorageName(num) {
		switch (num) {
			case '1':
				return 'first';
			case '2':
				return 'second';
			case '3':
				return 'third';
		}
	}

	getFractionIndex(fraction) {
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
