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
	  this.dbService.selectDB<number>('company').subscribe(value => this.company = value);

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

	addPeople(time) {
		const count = prompt('Сколько человек будет в ' + (time === 'day' ? 'ДНЕВНУЮ' : 'НОЧНУЮ') + ' смену?', '');
		const manager = prompt('Кто завсклада на данную смену?', this.userInMyApp.name);

		if (!count || !time || !manager) return;

		const update = {};

		update['company/people/count'] = count;
		update['company/people/time'] = time;
		update['company/people/manager'] = manager;

		this.dbService.updateDB(update);

		this.dbService.insertDB('statistic', {date: Date.now(), count, time, manager, user: this.userInMyApp.name})
	}

	checkPeople() {
		if (!this.company) return;

		const hour = new Date().getHours();

		if (hour > 10 && this.company[2].time === 'night') {
			this.addPeople('day')
		} else if ((hour > 22 || hour < 10) && this.company[2].time === 'day') {
			this.addPeople('night');
		}
	}
}
