import { Injectable, OnDestroy, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subscription, catchError, from, map, of } from 'rxjs';
import { UserData } from '../pages/user/models/userData';
import { HttpClient } from '@angular/common/http';
import { Auth, idToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isPermission = false;

  private auth: Auth = inject(Auth);
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription = new Subscription();

  constructor(
    private angularAuth: AngularFireAuth,
    private dataBase: AngularFireDatabase,
    private router: Router,
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {}

  signIn(email: string, password: string, isPersistence = false) {
    const persistence = isPersistence ? 'session' : 'local';
    this.angularAuth.setPersistence(persistence);
    return from(
      this.angularAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map(
        (userCredential: any) => {},
        catchError((error) =>
          of(this.message.error(`${error.message}`, { nzDuration: 3500 }))
        )
      )
    );
  }

  async signOut() {
    await this.angularAuth.signOut().then(() => this.router.navigate(['']));
  }

  // Permission

  getIsPermission(): boolean {
    return this.isPermission;
  }

  getUserProfile(uid: string): Observable<UserData> {
    return this.dataBase
      .object(`users/${uid}`)
      .valueChanges()
      .pipe(map((company) => company as UserData));
  }

  updatePermission() {
    this.angularAuth.user.subscribe((result) => {
      this.dataBase
        .object(`users/${result?.uid}`)
        .valueChanges()
        .pipe(map((user) => (user as UserData)?.company == 'ACCL'))
        .subscribe((isPermission) => {
          this.isPermission = isPermission;
        });
    });
  }

  ngOnDestroy() {
    this.idTokenSubscription.unsubscribe();
  }
}
