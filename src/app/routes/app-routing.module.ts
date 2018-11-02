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
import {MoneyComponent} from "../pages/money/money.component";
import {TableMoneyComponent} from "../pages/table-money/table-money.component";
import {TableMovementComponent} from "../pages/table-movement/table-movement.component";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [CanActivateViaAuthGuard],
	},
	{
		path: 'auth',
		component: AuthComponent,
	},
	{
		path: 'registration',
		component: RegistrationComponent
	},
	{
		path: 'table',
		component: TableComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'table-charges',
		component: TableMoneyComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'table-movement',
		component: TableMovementComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'movement',
		component: InternalMovementComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'create',
		component: CreateProductComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'delivery',
		component: DeliveryComponent,
		canActivate: [CanActivateViaAuthGuard]
	},
	{
		path: 'money',
		component: MoneyComponent,
		canActivate: [CanActivateViaAuthGuard]
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