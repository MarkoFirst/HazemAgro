
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {IMyUser} from '../../config/interfaces/IMyUser';

@Injectable()
export class StoreService {

    @LocalStorage userInMyApp: string;
    private myUser = new ReplaySubject<IMyUser>();

    constructor() {}

    setUser(user: IMyUser): void {
        this.myUser.next(user);
        this.userInMyApp = JSON.stringify(user);
    }

    get user(): Observable<IMyUser> {
        return this.myUser.asObservable();
    }
}
