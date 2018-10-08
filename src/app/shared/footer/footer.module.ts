import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer.component';
import {AppRoutingModule} from '../../routes/app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule { }