import {Component} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {IProduct} from "../../config/interfaces/IProduct";

@Component({
	selector: 'app-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

	connectError: boolean = false;
	connectDone: boolean = false;

	constructor(public dbService: DataBaseService) {}

	create(form) {
		if (form.invalid) return;
		const newPostKey = this.dbService.getNewId('product');

		const postData: IProduct = {
			id: newPostKey,
			name: form.value.name
		};

		const updates = {};
		updates['/product/' + newPostKey] = postData;
		this.dbService.updateDB(updates)
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
