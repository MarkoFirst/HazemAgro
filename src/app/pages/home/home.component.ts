import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import {IDelivery} from "../../config/interfaces/IDelivery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	deliveries$: Observable<IDelivery[]>;

	isShowSrorData: boolean = false;

	constructor(public dbService: DataBaseService) { }

  ngOnInit() {
	  this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery');
  }

	showStorData(event) {
		console.log(event);
		this.isShowSrorData = true;
	}

	noneStorData() {
		this.isShowSrorData = false;
	}
}
