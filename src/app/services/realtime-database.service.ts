import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, remove, set, update } from 'firebase/database';
import { UserData } from 'src/app/pages/user/models/userData';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  auth = getAuth();
  db = getDatabase();

  constructor(private dataBase: AngularFireDatabase) {}

  getUid() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }
    throw new Error('UID não disponível.');
  }

  saveData(path: string, data: unknown) {
    const db = ref(this.db, `${path}`);
    return from(set(db, data));
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

  getData(path: string) {
    return this.dataBase.object(path).valueChanges();
  }

  getUserProfile(uid: string) {
    return this.dataBase.object(`users/${uid}`).valueChanges();
  }
}
