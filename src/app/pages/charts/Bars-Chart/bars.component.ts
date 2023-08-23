import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartDataType } from '../models/chartModels';
import { ChartsService } from 'src/app/services/charts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit {
  ngOnInit(): void {}
}
