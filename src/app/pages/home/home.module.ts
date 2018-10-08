import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {AppRoutingModule} from '../../routes/app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }