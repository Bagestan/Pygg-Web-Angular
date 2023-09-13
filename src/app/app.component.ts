import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { FireBirdService } from './services/firebird.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  firestore: Firestore = inject(Firestore);

  constructor(
    private authService: AuthService,
    private FireBirdService: FireBirdService
  ) {}

  ngOnInit(): void {
    this.FireBirdService.getToken();

    this.authService.updatePermission();
  }
}
