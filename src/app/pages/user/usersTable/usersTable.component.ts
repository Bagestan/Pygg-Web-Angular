import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserData } from 'src/app/pages/user/models/userData';
import { firebaseAdminService } from 'src/app/services/firebaseAdmin.service';
import { RealtimeDatabaseService } from 'src/app/services/realtime-database.service';

@Component({
  selector: 'app-user',
  templateUrl: './usersTable.component.html',
  styleUrls: ['./usersTable.component.scss'],
})
export class UsersTableComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  usersList!: UserData[];

  constructor(
    private router: Router,
    private fbAdmin: firebaseAdminService,
    private route: ActivatedRoute,
    private database: RealtimeDatabaseService
  ) {
    this.getAllUsers();
  }

  ngOnInit() {}

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
    this.fbAdmin
      .listUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: UserData[]) => {
        this.usersList = result;
        result.forEach((user) => {
          this.database
            .getUserProfile(user.uid)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result: any) => {
              user.company = result['company'];
            });
        });
      });
  }
}
