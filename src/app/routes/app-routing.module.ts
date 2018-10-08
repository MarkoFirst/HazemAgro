import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from '../services/guards/CanActivateViaAuthGuard';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/pages/home/home.module#HomeModule',
        canActivate: [CanActivateViaAuthGuard],
    },
    {
        path: 'auth',
        loadChildren: 'app/pages/auth/auth.module#AuthModule'
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