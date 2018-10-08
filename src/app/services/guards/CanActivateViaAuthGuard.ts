import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor (private authService: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.authService.logined.asObservable();
    }
}