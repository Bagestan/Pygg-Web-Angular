import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FirebirdService } from './services/firebird.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fireBird: FirebirdService
  ) {}

  ngOnInit(): void {
    this.fireBird.getToken();

    this.authService.updatePermission();
  }
}
