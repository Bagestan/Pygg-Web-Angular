import { Component, OnInit } from '@angular/core';
import { ChartDataType } from '../models/chartModels';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {
  ngOnInit(): void {}
}
