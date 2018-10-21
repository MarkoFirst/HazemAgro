import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	onSubmit(f: NgForm) {
  	if (f.invalid) return;
		console.log(f.value);
	}

	checkRptPsw(psw, rptPsw) {
		if (psw.value === rptPsw.value || (!rptPsw.touched && !rptPsw.dirty)) return rptPsw;

		return {
			invalid: true,
			dirty: true,
			touched: true,
			errors: {
				...rptPsw.errors,
				'repeat': true,
			}
		};
	}
}
