import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {IDelivery} from "../../config/interfaces/IDelivery";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	deliveries$: Observable<IDelivery[]>;

  constructor(public dbService: DataBaseService) { }

  ngOnInit() {
    this.deliveries$ = this.dbService.selectDB<IDelivery>('delivery');
  }
}
