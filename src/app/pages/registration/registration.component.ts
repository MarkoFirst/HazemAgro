import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	adminPassword: string = 'hazemagro4200';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

	onSubmit(f: NgForm) {
  	if (f.invalid) return;
  	if (f.value.adminPassword !== this.adminPassword) {
  		f.reset();
  		alert('Wrong admin password!');
  		return;
	  }
		this.authService.signup(f.value.login, f.value.password);
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
