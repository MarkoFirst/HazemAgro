import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.authService.logined.asObservable().do(can => {
			if (can) this.router.navigate(['/'])
		});
	}

	onSubmit(f: NgForm) {
		if (f.invalid) return;

		this.authService.login(f.value.login, f.value.password);
	}
}
