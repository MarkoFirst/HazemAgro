import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './routes/app-routing.module';
import {CanActivateViaAuthGuard} from './services/guards/CanActivateViaAuthGuard';
import {AuthService} from './services/auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {RegistrationComponent} from './pages/registration/registration.component';
import {TableComponent} from './pages/table/table.component';
import {DeliveryComponent} from './pages/delivery/delivery.component';
import {DataBaseService} from "./services/db/data-base.service";
import {FormsModule} from "@angular/forms";
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {InternalMovementComponent} from './pages/internal-movement/internal-movement.component';
import {StoreDataComponent} from './components/store-data/store-data.component';
import {InfoBlockComponent} from './shared/info-block/info-block.component';
import {StoreService} from "./services/store/store.service";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

export const firebaseConfig = {
	apiKey: 'AIzaSyDi41jC_ngyXBuHU4EL9kRra9T2lMo_lOI',
	authDomain: 'hazem-agro.firebaseapp.com',
	databaseURL: 'https://hazem-agro.firebaseio.com',
	projectId: 'hazem-agro',
	storageBucket: 'hazem-agro.appspot.com',
	messagingSenderId: '840968950261'
};

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AuthComponent,
		HeaderComponent,
		FooterComponent,
		RegistrationComponent,
		TableComponent,
		DeliveryComponent,
		CreateProductComponent,
		InternalMovementComponent,
		StoreDataComponent,
		InfoBlockComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		AngularFireStorageModule,
		NgxPaginationModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
	],
	providers: [AuthService, CanActivateViaAuthGuard, DataBaseService, StoreService],
	bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}