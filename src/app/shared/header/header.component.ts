import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {LocalStorage} from "../../decorators/local-storage.decorator";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	@LocalStorage localization: boolean;

	constructor(public authService: AuthService) {
	}

	changeLanguage(language: boolean) {
		this.localization = language;
		window.location.reload();
	}
}
