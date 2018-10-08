import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AppRoutingModule} from '../../routes/app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [AuthComponent],
    exports: [AuthComponent]
})
export class AuthModule { }