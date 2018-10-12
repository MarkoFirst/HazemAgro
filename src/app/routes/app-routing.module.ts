import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from '../services/guards/CanActivateViaAuthGuard';
import {HomeComponent} from "../pages/home/home.component";
import {AuthComponent} from "../pages/auth/auth.component";
import {RegistrationComponent} from "../pages/registration/registration.component";
import {TableComponent} from "../pages/table/table.component";
import {DeliveryComponent} from "../pages/delivery/delivery.component";
import {InternalMovementComponent} from "../pages/internal-movement/internal-movement.component";
import {CreateProductComponent} from "../pages/create-product/create-product.component";

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		//canActivate: [CanActivateViaAuthGuard],
	},
	{
		path: '',
		component: AuthComponent
	},
	{
		path: 'registration',
		component: RegistrationComponent
	},
	{
		path: 'table',
		component: TableComponent
	},
	{
		path: 'movement',
		component: InternalMovementComponent
	},
	{
		path: 'create',
		component: CreateProductComponent
	},
	{
		path: 'delivery',
		component: DeliveryComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}