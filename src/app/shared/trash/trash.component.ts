import {Component, Input, OnInit} from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {LocalStorage} from "../../decorators/local-storage.decorator";
import {IProduct} from "../../config/interfaces/IProduct";

@Component({
  selector: 'trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
	@LocalStorage productListInApp: [IProduct];

	@Input('element') element: any;
  @Input('from') from: string;

	company: Object;

	constructor(private db: DataBaseService) {
		this.db.selectDB<number>('company').subscribe(value => this.company = value);
	}

  ngOnInit() {
  }

  removeElement() {
    if (!confirm('Вы уверены, что хотите удалить?')) return;

	  this.afterClear().then(() => this.db.insertDB('trash', this.element))
     .then(() => this.db.updateDB({[this.from + '/' + this.element.id]: null}));
  }

  afterClear(): Promise<any> {
	  if (this.from === 'delivery') {
		  const product = this.productListInApp.find(item => item.id === this.element.idProduct);
		  this.element.weight *= -1;
		  this.db.addNewDelivery(this.element, product, true);

		  return Promise.resolve();
	  } else if (this.from === 'company/charges') {
		  if (this.element.category !== 'fine' && this.element.category !== 'bonus') {
			  const update = {};

			  this.company[1] = Math.round((this.company[1] + this.element.cost)*1000)/1000;
			  update['company/money'] = this.company[1];

			  return this.db.updateDB(update);
		  }
    } else if (this.from === 'movement') {

	  } else {
	    return Promise.resolve();
    }
  }
}
