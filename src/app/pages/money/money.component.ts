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
			category: form.value.category,
			name: form.value.name,
			user: this.userInMyApp.name
		}).then(() => {
			this.connectDone = true;

			const update = {};
			const wallet = form.value.category !== 'fine' && form.value.category !== 'bonus' ? 'wallet' : 'fine';

			if (form.value.category === 'fine') form.value.cost *= -1;

			this.company[1][wallet] = Math.round((this.company[1][wallet] - form.value.cost) * 1000) / 1000;

			update['company/money/' + wallet] = this.company[1][wallet];

			this.dbService.updateDB(update);

			form.reset();
		})
			.catch((e) => {
				console.error(e);
				this.connectError = true;
			});

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);
	}

	addMoney(form) {
		const update = {};

		this.company[1] = Math.round((this.company[1] + form.value.add) * 1000) / 1000;
		update['company/money'] = this.company[1];

		this.dbService.updateDB(update)
			.then(() => this.connectDone = true)
			.catch(() => this.connectError = true);

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);

		form.reset();
	}
}
