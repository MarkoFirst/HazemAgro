import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-navigate-table',
  templateUrl: './navigate-table.component.html',
  styleUrls: ['./navigate-table.component.css'],
	providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class NavigateTableComponent implements OnInit {

	location: string;

	constructor(location: Location) { this.location = location.path(); }

  ngOnInit() {}
}
