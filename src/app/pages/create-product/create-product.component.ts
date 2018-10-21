import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

	connectError: boolean = false;
	connectDone: boolean = false;

  constructor(public dbService: DataBaseService) { }

  ngOnInit() {
  }

  create(form) {
	  if (form.invalid) return;

  }

}
