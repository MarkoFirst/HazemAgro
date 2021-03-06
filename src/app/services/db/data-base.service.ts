import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {ThenableReference} from 'firebase/database';
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import "rxjs-compat/add/operator/first";
import {EFraction} from "../../config/enums/EFraction";

@Injectable()
export class DataBaseService {

	constructor(private angularDataBase: AngularFireDatabase) {
	}

	selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
		const list: AngularFireList<T> = this.angularDataBase.list(from, callback);

		return list.valueChanges();
	}

	updateDB<T>(updates: T): Promise<Observable<{}>> {
		return this.angularDataBase.database.ref().update(updates).then(() => new Observable());
	}

	insertDB<T>(from: string, objToPush: T): ThenableReference {
		if (!objToPush['id']) {
			const newPostKey = this.getNewId('notes');

			objToPush['id'] = newPostKey;

			const updates = {};
			updates['/' + from + '/' + newPostKey] = objToPush;
			return this.updateDB(updates)
		}

		return this.angularDataBase.list(from).push(objToPush);
	}

	addNewDelivery(newDelivery: IDelivery, productDelivery: IProduct, removeDeliveryFlag?: boolean): ThenableReference {
		return this.selectDB(`storage/${newDelivery.storage}/filling/${newDelivery.idProduct}`, ref => ref)
			.first()
			.subscribe((data: number[]) => {
				const store = {};

				if (newDelivery.isSupply) {
					store[`/storage/${newDelivery.storage}/filling/${newDelivery.idProduct}/big`] = Math.round(((data[EFraction.big] || 0) + newDelivery.weight * (newDelivery.big / 100)) * 1000) / 1000;
					store[`/storage/${newDelivery.storage}/filling/${newDelivery.idProduct}/small`] = Math.round(((data[EFraction.small] || 0) + newDelivery.weight * (newDelivery.small / 100)) * 1000) / 1000;
					store[`/storage/${newDelivery.storage}/filling/${newDelivery.idProduct}/standard`] = Math.round(((data[EFraction.standard] || 0) + newDelivery.weight * (newDelivery.standard / 100)) * 1000) / 1000;
					store[`/storage/${newDelivery.storage}/filling/${newDelivery.idProduct}/waste`] = Math.round(((data[EFraction.waste] || 0) + newDelivery.weight * (newDelivery.waste / 100)) * 1000) / 1000;
				} else {

					if (data[EFraction[newDelivery.fraction]] < newDelivery.weight) return alert('There is no such quantity in stock!');

					store[`/storage/${newDelivery.storage}/filling/${newDelivery.idProduct}/${newDelivery.fraction}`] = Math.round((data[EFraction[newDelivery.fraction]] - newDelivery.weight) * 1000) / 1000;
				}

				return this.updateDB(store).then(() => {
					return (removeDeliveryFlag ? Promise.resolve() : this.insertDB<IDelivery>(`/delivery/`, newDelivery))
						.then(() => {
							const product = {};

							if (newDelivery.isSupply) {
								product[`/product/${newDelivery.idProduct}/waste`] = Math.round(((productDelivery.waste || 0) + newDelivery.weight * (newDelivery.waste / 100)) * 1000) / 1000;
								product[`/product/${newDelivery.idProduct}/standard`] = Math.round(((productDelivery.standard || 0) + newDelivery.weight * (newDelivery.standard / 100)) * 1000) / 1000;
								product[`/product/${newDelivery.idProduct}/big`] = Math.round(((productDelivery.big || 0) + newDelivery.weight * (newDelivery.big / 100)) * 1000) / 1000;
								product[`/product/${newDelivery.idProduct}/small`] = Math.round(((productDelivery.small || 0) + newDelivery.weight * (newDelivery.small / 100)) * 1000) / 1000;
							} else {
								product[`/product/${newDelivery.idProduct}/${newDelivery.fraction}`] = Math.round((productDelivery[newDelivery.fraction] - newDelivery.weight) * 1000) / 1000;
							}

							return this.updateDB(product);
						});
				})
			});
	}

	getNewId(from: string): string {
		return this.angularDataBase.database.ref().child(from).push().key;
	}
}