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
	// deliveries$: Observable<IDelivery[]>;
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
		// this.formValue.delivery = JSON.parse(this.formValue.delivery);
		let fractionList = [];

		this.dbService.selectDB(
			`storage/${this.getStorageName(this.formValue.storage)}/filling/${this.formValue.product.id}`
		).first()
			.subscribe((data: number[]) => {
				let product = {};

				const sumData = data.reduce((previousValue, item) => previousValue + item, 0);
				fractionList = data.map(item => item/sumData);

				if (data[this.getFractionIndex(this.formValue.fraction)] < this.formValue.weight ||
					(this.formValue.fraction === 'rawStuff' && sumData < this.formValue.weight)) {
					alert('There is no such quantity in stock!');

					return Error('There is no such quantity in stock!');
				}

				if (this.formValue.fraction === 'rawStuff') {
					this.addToFractions(
						product,
						data,
						`storage/${this.formValue.storage}/filling`,
						this.formValue.product.id,
						this.formValue.weight * -1,
						fractionList
					);

					if (this.formValue.storageFor === 'discard') {
						this.addToFractions(
							product,
							data,
							`product`,
							this.formValue.product.id,
							this.formValue.weight * -1,
							fractionList
						);
					}
				} else {
					product[`/storage/${this.getStorageName(this.formValue.storage)}/filling/${this.formValue.product.id}/${this.formValue.fraction}`] =
						Math.round(((data[this.getFractionIndex(this.formValue.fraction)] || 0) - this.formValue.weight) * 1000) / 1000;

					if (this.formValue.storageFor === 'discard') {
						product[`/product/${this.formValue.product.id}/${this.formValue.fraction}`] =
							Math.round(((data[this.getFractionIndex(this.formValue.fraction)] || 0) - this.formValue.weight) * 1000) / 1000;
					}
				}

				return this.dbService.updateDB(product).then(() => {
					this.dbService.selectDB(
						`storage/${this.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product.id}`
					).first()
						.subscribe((data: number[]) => {
							if (this.formValue.storageFor === 'discard') return Promise.resolve();
							const productTo = {};

							if (this.formValue.fraction === 'rawStuff') {
								this.addToFractions(
									productTo,
									data,
									`storage/${this.getStorageName(this.formValue.storageFor)}/filling`,
									this.formValue.product.id,
									this.formValue.weight,
									fractionList
								);
							} else {
								productTo[`/storage/${this.getStorageName(this.formValue.storageFor)}/filling/${this.formValue.product.id}/${this.formValue.fraction}`] =
									Math.round(((data[this.getFractionIndex(this.formValue.fraction)] || 0) + this.formValue.weight) * 1000) / 1000;
							}

							return this.dbService.updateDB(productTo);
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

	addToFractions(obj, data, where, productId, weight, fractionList) {
		['big', 'small', 'standard', 'waste'].forEach((item, index) => {
			obj[`/${where}/${productId}/${item}`] =
				Math.round((
					(data[index] || 0) + (weight * (fractionList[index]))
				) * 1000) / 1000;
		});
	}

	// setSelectProduct({value}) {
	// 	const id = JSON.parse(value).id;
	//
	// 	this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery', ref => ref)
	// 		.map(value => value.filter(item => item.idProduct === id && item.isSupply));
	// }

	getProducts(num) {
		switch (num) {
			case 'first':
				return this.productsFirstStore$;
			case 'second':
				return this.productsSecondStore$;
			case 'third':
				return this.productsThirdStore$;
			default:
				return this.productsFirstStore$;
		}
	}

	getStorageName(num) {
		switch (num) {
			// case '1':
			// 	return 'first';
			// case '2':
			// 	return 'second';
			// case '3':
			// 	return 'third';
			case 'discard':
				return 'waste';
			default:
				return num;
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
