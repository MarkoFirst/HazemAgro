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

	signup(email: string, password: string) {
		this.firebaseAuth
			.auth
			.createUserWithEmailAndPassword(email + '@hazem.com', password)
			.then(value => {
				// Get a key for a new Post.
				const newPostKey = this.myDb.getNewId('users');
				const postData = {
					isAdmin: false,
					name: email,
					id: newPostKey,
					password: password,
				};
				this.storeService.setUser(postData);
				this.logined.next(true);
				this.localLogined = true;
				const updates = {};
				updates['/users/' + newPostKey] = postData;
				this.router.navigateByUrl('/');
				return this.db.database.ref().update(updates);
			})
			.catch(err => {
			});
	}

	login(email: string, password: string) {
		this.firebaseAuth
			.auth
			.signInWithEmailAndPassword(email.toLowerCase() + '@hazem.com', password)
			.then(value => {
				this.myDb.selectDB('users', ref =>
					ref.orderByChild('name'))
					.pipe(takeUntil(this.onDestroyStream$))
					.subscribe((users: IMyUser[]) => {
						this.storeService.setUser(users.find(item => value.user.email.includes(item.name.toLowerCase())));
					});
				this.logined.next(true);
				this.localLogined = true;
				this.router.navigateByUrl('/');
			})
			.catch(err => {
			});
	}

	logout() {
		this.logined.next(false);
		this.localLogined = false;
		this.firebaseAuth
			.auth
			.signOut();
	}

	ngOnDestroy(): void {
		this.onDestroyStream$.next();
		this.onDestroyStream$.complete();
	}
}
