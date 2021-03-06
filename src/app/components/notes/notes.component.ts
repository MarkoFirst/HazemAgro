import { Component, OnInit } from '@angular/core';
import {DataBaseService} from "../../services/db/data-base.service";
import {Observable} from "rxjs";
import {INotes} from "../../config/interfaces/INotes";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	connectError: boolean = false;
	connectDone: boolean = false;
	p: number;

	notes$: Observable<INotes[]>;

	constructor(public dbService: DataBaseService) {}

	ngOnInit(): void {
		this.notes$ = this.dbService.selectDB('notes');
	}

	addNote(form) {
		if (form.invalid) return;

		this.dbService.insertDB('notes', {text: form.value.text, date: Date.now()})
			.then(() => this.connectDone = true)
			.catch(() => this.connectError = true);

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);

		form.reset();
	}
}
