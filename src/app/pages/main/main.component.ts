import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isCollapsed = true;

  constructor(public auth: AuthService) {}
  ngOnInit(): void {}
}
