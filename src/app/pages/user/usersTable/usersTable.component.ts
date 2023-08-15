import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/pages/user/models/userData';
import { AuthService } from 'src/app/services/auth.service';
import { firebaseAdminService } from '../service/firebaseAdmin.service';

@Component({
  selector: 'app-user',
  templateUrl: './usersTable.component.html',
  styleUrls: ['./usersTable.component.scss'],
})
export class UsersTableComponent implements OnInit {
  public get router(): Router {
    return this._router;
  }

  public set router(value: Router) {
    this._router = value;
  }

  hGutter = 8;
  vGutter = 8;

  newUserForm!: FormGroup;
  updateUserForm!: FormGroup;

  enableUserEdit = false;
  usersList!: UserData[];

  constructor(
    private authService: AuthService,
    private _router: Router,
    private fbAdmin: firebaseAdminService,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  createUser() {
    this.router.navigate([`form/`], { relativeTo: this.route });
  }

  openUser(email: string) {
    this.router.navigate([`form/${email}`], { relativeTo: this.route });
  }

  editUser(email: string) {
    this.router.navigate([`form/${email}/edit`], { relativeTo: this.route });
  }

  getAllUsers() {
    this.fbAdmin.listUsers().subscribe((result: UserData[]) => {
      this.usersList = result;

      result.forEach((user) => {
        this.authService.getUserProfile(user.uid).subscribe((result) => {
          user.company = result?.company;
        });
      });
    });
  }
}
