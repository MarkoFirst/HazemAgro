import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorage} from "./decorators/local-storage.decorator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	@LocalStorage localLogined: boolean;
	@LocalStorage localization: boolean;

	constructor(private translate: TranslateService) {
		translate.setDefaultLang(this.localization ? 'ru' : 'en');
	}
}
