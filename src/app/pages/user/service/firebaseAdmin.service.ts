import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { UserAuth, UserData } from 'src/app/pages/user/models/userData';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class firebaseAdminService {
  userData = new Observable<UserData>();
  authenticatedUser!: boolean;

  fireAuth = this.angularAuth;

  private readonly API = 'http://localhost:3000/';
  static getIsPermission: any;

  token!: string | null;

  header!: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private angularAuth: AngularFireAuth
  ) {
    this.auth.idToken$.subscribe((result: string | null) => {
      this.token = result;
      this.headerBuilder();
    });
  }

  headerBuilder(): void {
    this.header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
  }
  // Funções do Firebase Admin //

  listUsers() {
    return this.httpClient.post<UserData[]>(
      `${this.API}users/listUsers`,
      {},
      { headers: this.header }
    );
  }

  userByEmail(email: string) {
    return this.httpClient.post<UserData>(
      `${this.API}users/userByEmail`,
      {
        email: email,
      },
      { headers: this.header }
    );
  }

  updateAuthUser(user: UserAuth) {
    return this.httpClient.post<UserData>(`${this.API}users/updateUser`, user, {
      headers: this.header,
    });
  }

  createAuthUser(user: UserAuth) {
    return this.httpClient.post<UserAuth>(
      `${this.API}users/createAuthUser`,
      user,
      { headers: this.header }
    );
  }

  deleteUser(uid: string) {
    return this.httpClient.post(
      `${this.API}users/deleteUser`,
      { uid: uid },
      { headers: this.header }
    );
  }
}
