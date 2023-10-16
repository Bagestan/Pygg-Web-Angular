import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Subject, catchError, map, switchMap, takeUntil } from 'rxjs';
import { UserAuth, UserData } from 'src/app/pages/user/models/userData';
import { firebaseAdminService } from 'src/app/services/firebaseAdmin.service';
import { RealtimeDatabaseService } from 'src/app/services/realtime-database.service';
import { FormService } from 'src/app/services/utils/form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  user!: UserData;

  newUserProfile!: boolean;
  routeData!: {};

  cardLoading!: boolean;
  passwordVisible = false;
  password?: string;
  defaultUserActivated!: boolean;

  protected destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private nzMessage: NzMessageService,
    private router: Router,
    private fbAdmin: firebaseAdminService,
    private RealtimeDB: RealtimeDatabaseService,
    private formService: FormService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.message.loading('');
    this.onLoading(true);
    this.buildForm();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((user: any) => {
      return Object.keys(user).length !== 0
        ? this.getUserData(user['user'])
        : EMPTY;
    });

    this.onLoading(false);
  }

  buildForm() {
    this.form = this.fb.group({
      company: [null, [Validators.required]],
      email: [null, [Validators.required]],
      disabled: [null],
      password: [null],
    });
  }

  private getUserData(email: string) {
    this.onLoading(true);

    this.fbAdmin
      .userByEmail(email)
      .pipe(
        switchMap((result) => {
          this.user = result;
          return this.RealtimeDB.getUserProfile(result.uid).pipe(
            map((userProfile: any) => {
              this.user.company = userProfile['company'];
              this.defaultUserActivated = userProfile['disabled'];
              this.message.remove();
            }),
            catchError(() => {
              return EMPTY;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.populateForm();
        },
        error: (error) => console.error(error),
        complete: () => this.onLoading(false),
      });
  }

  private populateForm() {
    this.form.patchValue({
      company: this.user.company,
      email: this.user.email,
      disabled: !this.user.disabled,
    });
  }

  submitForm() {
    const email = this.form.get('email')?.value;
    const user: UserData = {
      uid: this.user?.uid,
      company: this.form.get('company')?.value,
      email: email,
      disabled: !(this.form.get('disabled')?.value ?? false),
    };
    const userAuth: UserAuth = {
      uid: this.user?.uid,
      email: email,
      password: this.form.get('password')?.value,
      disabled: !(this.form.get('disabled')?.value ?? false),
    };

    if (this.form.valid) {
      this.user?.uid
        ? this.newUserProfile
          ? this.createUserProfile(user)
          : (this.updateUserProfile(user), this.updateAuthUser(userAuth))
        : this.createAuthUser(userAuth);
    } else {
      this.nzMessage.warning('Verifique as informações do formulário');
      this.formService.validateAllFormFields(this.form);
    }
  }

  // Firebase Auth

  updateAuthUser(user: UserAuth) {
    this.nzMessage.loading('Salvando', { nzDuration: 500 });

    if (user.password) {
      this.fbAdmin
        .updateAuthUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.nzMessage.success('Senha atualizada');
          },
          error: (error: any) => {
            this.nzMessage.error(error.error.message);
          },
        });
    }
  }

  createAuthUser(user: UserAuth) {
    this.nzMessage.loading('Salvando', { nzDuration: 500 });

    this.fbAdmin
      .createAuthUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          const user: UserData = {
            company: this.form.get('company')?.value,
            email: this.form.get('email')?.value,
            uid: result.uid,
          };

          this.createUserProfile(user);

          this.onBack();
        },
        error: (error: any) => {
          this.nzMessage.error(error.error.message, { nzDuration: 5000 });
        },
      });
  }

  // RealTime Database

  createUserProfile(user: UserData) {
    this.RealtimeDB.createProfile(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.nzMessage.success('Usuário criado');
        },
        error: (error) => {
          this.nzMessage.error(error);
        },
      });
  }

  updateUserProfile(user: UserData) {
    this.RealtimeDB.updateUserProfile(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.nzMessage.success('Usuário salvo');
          this.onBack();
        },
        error: (error) => {
          this.nzMessage.error(error, { nzDuration: 5000 });
        },
      });
  }

  // Outras funções

  onBack() {
    this.router.navigate(['main/user']);
  }

  onLoading(value: boolean) {
    this.cardLoading = value;
  }

  popConfirm() {
    this.fbAdmin
      .deleteUser(this.user.uid)
      .pipe(
        switchMap(() =>
          this.RealtimeDB.deleteUserProfile(this.user.uid).pipe(
            map(
              () => {
                this.nzMessage.success('Usuário Excluido');
              },
              catchError((error) => {
                console.error(error);
                return EMPTY;
              })
            )
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.onBack();
        },
        error: (error) => {
          this.nzMessage.error(error.error, { nzDuration: 5000 });
        },
      });
  }
}
