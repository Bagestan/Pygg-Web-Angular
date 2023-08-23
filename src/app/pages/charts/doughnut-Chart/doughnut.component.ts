import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { ChartDataType } from '../models/chartModels';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {
  public doughnutChartData!: ChartData<'doughnut'>;
  ChartData!: ChartDataType;

  ngOnInit(): void {
    ChartsService.barsChartDataEmitter.subscribe((data) => {
      this.ChartData = data;
      this.populateChart(this.ChartData);
    });
  }

  populateChart(ChartData: ChartDataType) {
    this.doughnutChartData = {
      labels: ChartData.abbreviatedLabel,
      datasets: ChartData.datasets,
    };
  }

  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
