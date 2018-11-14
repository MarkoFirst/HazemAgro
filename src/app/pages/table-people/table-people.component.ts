import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ICharge} from "../../config/interfaces/ICharge";
import {DataBaseService} from "../../services/db/data-base.service";

@Component({
  selector: 'app-table-people',
  templateUrl: './table-people.component.html',
  styleUrls: ['./table-people.component.css']
})
export class TablePeopleComponent implements OnInit {

	people$: Observable<ICharge[]>;
	p: number;

	constructor(public dbService: DataBaseService) { }

	ngOnInit() {
		this.people$ = this.dbService.selectDB('statistic');
	}

}
