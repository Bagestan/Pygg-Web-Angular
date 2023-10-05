import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, from, of, Subject, takeUntil } from 'rxjs';
import { Auth, idToken } from '@angular/fire/auth';
import { RealtimeDatabaseService } from './realtime-database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected destroy$: Subject<void> = new Subject<void>();

  isPermission = false;
  allowedCompanies = ['ACCL'];

  private auth: Auth = inject(Auth);
  idToken$ = idToken(this.auth);

  constructor(
    private angularAuth: AngularFireAuth,
    private router: Router,
    private message: NzMessageService,
    private database: RealtimeDatabaseService
  ) {}

  signIn(email: string, password: string, isPersistence = false) {
    const persistence = isPersistence ? 'session' : 'local';
    this.angularAuth.setPersistence(persistence);
    return from(
      this.angularAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) =>
        of(this.message.error(`${error.message}`, { nzDuration: 3500 }))
      )
    );
  }

  async signOut() {
    await this.angularAuth.signOut().then(() => this.router.navigate(['']));
  }

  // Permission

  getIsPermission(): boolean {
    this.updatePermission();
    return this.isPermission;
  }

  updatePermission() {
    this.angularAuth.user.pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result)
        this.database
          .getUserProfile(result.uid)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data: any) => {
              this.isPermission = this.allowedCompanies.includes(data.company)
                ? true
                : false;
            },
            () => {
              return false;
            }
          );
    });
  }
}
