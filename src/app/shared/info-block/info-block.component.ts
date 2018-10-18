import {Component, Input} from '@angular/core';
import {NgControl} from "@angular/forms";

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.css']
})
export class InfoBlockComponent {

  @Input() inputList: NgControl[];
	@Input() errorList: string[];

  constructor() { }
}
