import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routes/app-routing.module';
import { CanActivateViaAuthGuard } from './services/guards/CanActivateViaAuthGuard';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import {HeaderModule} from './shared/header/header.module';
import {FooterModule} from './shared/footer/footer.module';

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
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      HeaderModule,
      FooterModule,
  ],
  providers: [AuthService, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
