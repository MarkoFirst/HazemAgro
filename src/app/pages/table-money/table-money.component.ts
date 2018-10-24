import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {ICharge} from "../../config/interfaces/ICharge";

@Component({
  selector: 'app-table-money',
  templateUrl: './table-money.component.html',
  styleUrls: ['./table-money.component.css']
})
export class TableMoneyComponent implements OnInit {

	charges$: Observable<ICharge[]>;

  constructor(public dbService: DataBaseService) { }

  ngOnInit() {
	  this.charges$ = this.dbService.selectDB<ICharge>('company/charges');
  }

}
