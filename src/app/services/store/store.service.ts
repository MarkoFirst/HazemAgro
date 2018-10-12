import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {LocalStorage} from '../../decorators/local-storage.decorator';
import {IMyUser} from '../../config/interfaces/IMyUser';
import {IProduct} from "../../config/interfaces/IProduct";

@Injectable()
export class StoreService {

    @LocalStorage userInMyApp: string;
    @LocalStorage productListInApp: string;
    private myUser = new ReplaySubject<IMyUser>();
    private myProductList = new ReplaySubject<IProduct[]>();

    constructor() {}

    setUser(user: IMyUser): void {
        this.myUser.next(user);
        this.userInMyApp = JSON.stringify(user);
    }

    get user(): Observable<IMyUser> {
        return this.myUser.asObservable();
    }

	  setProductList(products: IProduct[]): void {
		    this.myProductList.next(products);
		    this.productListInApp = JSON.stringify(products);
	  }

	  get productList(): Observable<IProduct[]> {
		    return this.myProductList.asObservable();
	  }
}
