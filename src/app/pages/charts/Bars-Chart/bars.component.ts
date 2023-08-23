import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartDataType } from '../models/chartModels';
import { ChartsService } from 'src/app/services/charts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData!: ChartData<'bar'>;
  public barChartOptions: ChartConfiguration['options'];

  startDate!: string;
  endDate!: string;

  constructor() {}

  ngOnInit() {
    ChartsService.barsChartDataEmitter.subscribe((data) => {
      const stacked = data.chartType === 'stackedBars';
      this.populateChart(data, stacked);
    });
  }

  populateChart(chartDataSet: ChartDataType, stacked: boolean) {
    this.barChartData = {
      labels: chartDataSet.abbreviatedLabel,
      datasets: chartDataSet.datasets,
    };
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: { stacked: stacked },
        y: { stacked: stacked },
      },
      plugins: {
        datalabels: {
          formatter: (value: any) => {
            let formattedValue = value;

            if (value >= 1_000_000_000) {
              formattedValue = (value / 1_000_000_000).toFixed(1) + 'B';
            } else if (value >= 1_000_000) {
              formattedValue = (value / 1_000_000).toFixed(1) + 'M';
            } else if (value >= 1_000) {
              formattedValue = (value / 1_000).toFixed(1) + 'K';
            }
            return formattedValue;
          },
        },
        tooltip: {
          callbacks: {
            title: function (context: any) {
              return chartDataSet.label[context[0].dataIndex];
            },
            label: function (context: any) {
              let label = context.dataset.label || '';
              if (label) label += ': ';

              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    };
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}
}
