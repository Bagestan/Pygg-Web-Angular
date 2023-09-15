import { Component, OnInit, inject } from '@angular/core';
import { FireBirdService } from './services/firebird.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private FireBirdService: FireBirdService
  ) {}

  ngOnInit(): void {
    this.FireBirdService.getToken();

    this.authService.updatePermission();
  }
}
