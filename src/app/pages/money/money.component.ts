import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IMyUser} from "../../config/interfaces/IMyUser";
import {DataBaseService} from "../../services/db/data-base.service";
import {ICharge} from "../../config/interfaces/ICharge";

@Component({
	selector: 'app-money',
	templateUrl: './money.component.html',
	styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

	@LocalStorage userInMyApp: IMyUser;

	company: Object;
	connectError: boolean = false;
	connectDone: boolean = false;

	constructor(private dbService: DataBaseService) {
	}

	ngOnInit() {
		this.dbService.selectDB<number>('company').subscribe(value => this.company = value);
	}

	charge(form) {
		this.dbService.insertDB<ICharge>('/company/charges/', {
			date: Date.now().toString(),
			cost: form.value.cost,
			name: form.value.name
		})
	}

	addMoney(form) {
		const update = {};

		this.company[2] = this.company[2] + form.value.add;
		update['company/money'] = this.company[2];

		this.dbService.updateDB(update)
	}
}
