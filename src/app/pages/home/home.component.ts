import {Component, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import {IDelivery} from "../../config/interfaces/IDelivery";
import {IProduct} from "../../config/interfaces/IProduct";
import {StoreService} from "../../services/store/store.service";
import "rxjs/add/operator/take";
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IMyUser} from "../../config/interfaces/IMyUser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	@LocalStorage userInMyApp: IMyUser;

	deliveries$: Observable<IDelivery[]>;
	products$: Observable<IProduct[]>;
	company: Object;
	productList: IProduct[];

	idStore: number = 4;

	constructor(public dbService: DataBaseService, public storeService: StoreService) { }

  ngOnInit() {
	  this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery', ref => ref.orderByChild('date'));
	  this.dbService.selectDB<number>('company').subscribe(value => {this.company = value; this.checkPeople()});

	  this.products$ = this.dbService.selectDB<IProduct>('product');
	  this.products$.forEach(i => {
		  this.storeService.setProductList(i);
		  this.productList = i;
	  });
	}

	showStorData(event, idStore) {
		this.idStore = this.idStore === idStore ? 4 : idStore;
		event.stopPropagation()
	}

	findProductName(id) {
		return this.productList.find(item => item.id === id).name;
	}

	addPeople(time, rewrite?: boolean) {
		const count = prompt('Сколько человек будет в ' + (time === 'day' ? 'ДНЕВНУЮ' : 'НОЧНУЮ') + ' смену?', '');
		if (!count) return;

		const manager = prompt('Кто завсклада на данную смену?', this.userInMyApp.name);
		if (!manager) return;

		const why = rewrite ? prompt('Причина изменения?', '') : '';

		if (!count || !time || !manager || (rewrite && !why)) return;

		const update = {};

		update['company/people/count'] = count;
		update['company/people/time'] = time;
		update['company/people/manager'] = manager;

		this.dbService.updateDB(update);

		const data = {
			date: Date.now(),
			count,
			time,
			manager,
			user: this.userInMyApp.name
		};

		if (rewrite) data['why'] = why;

		this.dbService.insertDB('statistic', data);

		if (time === 'night' && !rewrite) {
			const olchick = prompt('Сколько часов отработала Ольга за ' + new Date().getDay() + ' число?', '0');
			// const ura = prompt('Сколько часов отработал Юрий за ' + new Date().getDay() + ' число?', '0');

			if (!olchick) return;

			this.dbService.insertDB('users/-LQFYuDQmyzkszgaqTSh/worktime/' + new Date().getMonth(),
				{time: olchick, date: Date.now()});
		}
	}

	checkPeople(rewrite?: boolean) {
		if (!this.company) return;

		if (rewrite) {
			this.addPeople(this.company[2].time, rewrite);
			return;
		}

		const hour = new Date().getHours();

		if (hour >=10 && this.company[2].time === 'night') {
			this.addPeople('day')
		} else if ((hour >= 20 || hour < 10) && this.company[2].time === 'day') {
			this.addPeople('night');
		}
	}
}
