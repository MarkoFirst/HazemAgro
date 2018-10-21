import {Component} from '@angular/core';
import {LocalStorage} from "./decorators/local-storage.decorator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	@LocalStorage localLogined: boolean;
}
