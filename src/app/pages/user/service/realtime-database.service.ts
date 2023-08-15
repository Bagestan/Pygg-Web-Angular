import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, remove, set, update } from 'firebase/database';
import { UserData } from 'src/app/pages/user/models/userData';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  auth = getAuth();
  db = getDatabase();

  constructor() {}

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
}
