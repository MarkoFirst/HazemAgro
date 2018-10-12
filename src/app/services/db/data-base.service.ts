import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {ThenableReference} from 'firebase/database';
import {IDelivery} from "../../config/interfaces/IDelivery";

@Injectable()
export class DataBaseService {

    constructor(private angularDataBase: AngularFireDatabase) {}

    selectDB<T>(from: string, callback: QueryFn = ref => ref): Observable<T[]> {
        const list: AngularFireList<T> = this.angularDataBase.list(from, callback);

        return list.valueChanges();
    }

    updateDB<T>(updates: T): Promise<Observable<{}>> {
        return this.angularDataBase.database.ref().update(updates).then(() => new Observable());
    }

    insertDB<T>(from: string, objToPush: T): ThenableReference {
        return this.angularDataBase.list(from).push(objToPush);
    }

	  addNewDelivery(newDelivery: IDelivery): ThenableReference {
		    return this.insertDB<IDelivery>(`/delivery/`, newDelivery);
	  }

    getNewId(from: string): string {
        return this.angularDataBase.database.ref().child(from).push().key;
    }
}