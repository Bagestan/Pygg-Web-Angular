import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/AuthService';
import { FireBirdService } from './services/firebird.service';

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
