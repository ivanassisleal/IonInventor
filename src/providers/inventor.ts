
import { Injectable } from '@angular/core';
import { Inventor } from '../models/inventor';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class InventorProvider {

  private _collection = 'inventors/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this._collection)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  remove(key: string) {
    return this.db.list(this._collection).remove(key);
  }

  save(inventor: Inventor) {
    return new Promise((resolve, reject) => {
      if (inventor.key) {
        this.db.list(this._collection)
          .update(inventor.key, { firstName: inventor.firstName, lastName: inventor.lastName })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this._collection)
          .push({ firstName: inventor.firstName, lastName: inventor.lastName })
          .then(() => resolve());
      }
    })
  }
}
