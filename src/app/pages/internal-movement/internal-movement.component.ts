import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../config/interfaces/IProduct";
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-internal-movement',
  templateUrl: './internal-movement.component.html',
  styleUrls: ['./internal-movement.component.css']
})
export class InternalMovementComponent implements OnInit {

	products$: Observable<IProduct[]>;
	connectError: boolean = false;
	connectDone: boolean = false;

  constructor(public dbService: DataBaseService) { }

  ngOnInit() {
	  this.products$ = this.dbService.selectDB<IProduct>('product');
  }

  move(form) {
	  if (form.invalid) return;

  }

}
