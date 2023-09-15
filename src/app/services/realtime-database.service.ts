import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { getAuth } from '@firebase/auth';
import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { UserData } from 'src/app/pages/user/models/userData';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  auth = getAuth();
  db = getDatabase();

  constructor(private dataBase: AngularFireDatabase) {
    this.teste();
  }

  teste() {
    const starCountRef = ref(this.db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    });
  }

  getUid() {
    return this.auth.currentUser?.uid;
  }

  createProfile(user: UserData) {
    const userRef = ref(this.db, `users/${user?.uid}`);
    return from(set(userRef, user));
  }

  updateUserProfile(user: UserData) {
    const userRef = ref(this.db, `users/${user?.uid}`);
    return from(update(userRef, user));
  }

  deleteUserProfile(uid: string) {
    const userRef = ref(this.db, `users/${uid}`);
    return from(remove(userRef));
  }

  getUserProfile(uid: string) {
    return this.dataBase.list(`users/${uid}`).valueChanges();
  }

  getPermission(result: any) {
    this.dataBase
      .object(`users/${result?.uid}`)
      .valueChanges()
      .pipe(
        map((user) => {
          (user as UserData)?.company == 'ACCL';
        })
      )
      .subscribe((isPermission) => {
        return isPermission;
      });
  }
}
