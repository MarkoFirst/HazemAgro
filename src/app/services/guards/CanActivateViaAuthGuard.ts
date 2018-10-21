import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import "rxjs-compat/add/operator/do";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor (private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.logined.asObservable().do(can => {
            if (!can) this.router.navigate(['/auth'])
        });
    }
}