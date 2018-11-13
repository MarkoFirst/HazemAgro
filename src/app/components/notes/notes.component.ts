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

	notes$: Observable<INotes[]>;

	constructor(public dbService: DataBaseService) {}

	ngOnInit(): void {
		this.notes$ = this.dbService.selectDB('notes');
	}

	addNote(form) {
		if (form.invalid) return;
		const newPostKey = this.dbService.getNewId('notes');

		const postData = {
			id: newPostKey,
			text: form.value.text,
			date: Date.now()
		};

		const updates = {};
		updates['/notes/' + newPostKey] = postData;
		this.dbService.updateDB(updates)
			.then(() => this.connectDone = true)
			.catch(() => this.connectError = true);

		setTimeout(() => {
			this.connectDone = false;
			this.connectError = false;
		}, 4000);

		form.reset();
	}
}
