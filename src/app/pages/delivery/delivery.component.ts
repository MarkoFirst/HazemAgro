import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IProduct} from "../../config/interfaces/IProduct";
import {DataBaseService} from "../../services/db/data-base.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
	products$: Observable<IProduct[]>;

  constructor(public dbService: DataBaseService) { }

  ngOnInit() {
	  this.products$ = this.dbService.selectDB<IProduct>('product');
  }

}
