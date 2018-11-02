import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataBaseService} from "../../services/db/data-base.service";
import {IMovement} from "../../config/interfaces/IMovement";

@Component({
  selector: 'app-table-movement',
  templateUrl: './table-movement.component.html',
  styleUrls: ['./table-movement.component.css']
})
export class TableMovementComponent implements OnInit {

	moves$: Observable<IMovement[]>;
	p: number;

	constructor(public dbService: DataBaseService) { }

	ngOnInit() {
		this.moves$ = this.dbService.selectDB<IMovement>('movement');
	}

}
