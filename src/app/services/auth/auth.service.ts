import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {takeUntil} from 'rxjs/operators';
import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';
import {StoreService} from '../store/store.service';
import {DataBaseService} from '../db/data-base.service';
import {User} from 'firebase/app';
import {Router} from '@angular/router';
import {LocalStorage} from '../../decorators/local-storage.decorator';

import {IMyUser} from "../../config/interfaces/IMyUser";

@Injectable()
export class AuthService implements OnDestroy {
    user: Observable<User>;
    @LocalStorage localLogined: boolean;
    logined: BehaviorSubject<boolean> = new BehaviorSubject(this.localLogined);

    private onDestroyStream$ = new Subject<void>();

    constructor(private firebaseAuth: AngularFireAuth,
                public  db: AngularFireDatabase,
                private myDb: DataBaseService,
                private storeService: StoreService,
                private router: Router) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password: string, newLogin: string) {
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                // Get a key for a new Post.
                const newPostKey = this.myDb.getNewId('users');
                const postData = {
                    login: newLogin,
                    id: newPostKey,
                    password: password,
                    mail: email
                };
                this.storeService.setUser({
                    id: newPostKey,
                    login: newLogin,
                    mail: email,
                    password: password,
                });
                this.logined.next(true);
                this.localLogined = true;
                const updates = {};
                updates['/users/' + newPostKey] = postData;
                this.router.navigateByUrl('/users');
                return this.db.database.ref().update(updates);
            })
            .catch(err => {
            });
    }

    login(email: string, password: string) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email.toLowerCase(), password)
            .then(value => {
                this.myDb.selectDB('users', ref =>
                    ref.orderByChild('mail')
                        .equalTo(value.user.email))
                    .pipe(takeUntil(this.onDestroyStream$))
                    .subscribe((users: IMyUser[]) => {
                        this.storeService.setUser(users[0]);
                    });
                this.logined.next(true);
                this.localLogined = true;
                this.router.navigateByUrl('/users');
            })
            .catch(err => {});
    }

    logout() {
        this.logined.next(false);
        this.localLogined = false;
        this.firebaseAuth
            .auth
            .signOut();
    }

    changePassword(newPassword: string): void {
        this.firebaseAuth.auth.currentUser.updatePassword(newPassword);
    }

    ngOnDestroy(): void {
        this.onDestroyStream$.next();
        this.onDestroyStream$.complete();
    }

}
