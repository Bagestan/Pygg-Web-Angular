import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FireBirdService } from 'src/app/services/firebird.service';
import { ChartsService } from '../../../services/charts.service';
import { ChartFilter } from '../models/chartModels';
import { Colors } from 'chart.js';

@Component({
  selector: 'app-profit-by-client',
  templateUrl: './profit-by-client.component.html',
  styleUrls: ['./profit-by-client.component.scss'],
})
export class ProfitByClientComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData!: ChartData<'bar'>;
  public barChartOptions: ChartConfiguration['options'];

  constructor(private firebirdService: FireBirdService) {}

  ngOnInit(): void {
    ChartsService.chartDataEmitter.subscribe((data) => this.getChartData(data));
  }

  startDate!: string;
  endDate!: string;

  getChartData(data: ChartFilter) {
    this.firebirdService
      .getChartData(data.startDate, data.endDate)
      .subscribe((result) => {
        console.log(result);

        const clientName = Object.values(
          result.map((item) => item.NM_CLI).slice(0, data.maxChartItems)
        );

        const abbreviatedName = Object.values(
          result
            .map((item) => item.NM_CLI.split(' ')[0])
            .slice(0, data.maxChartItems)
        );

        let profitValue = Object.values(
          result.map((item) => item.LUC).slice(0, data.maxChartItems)
        );
        const billingQuantity = Object.values(
          result.map((item) => item.Q_FAT).slice(0, data.maxChartItems)
        );
        const billingValue = Object.values(
          result.map((item) => item.V_FAT).slice(0, data.maxChartItems)
        );

        this.populateChart(
          clientName,
          abbreviatedName,
          profitValue,
          billingQuantity,
          billingValue
        );
      });
  }

  populateChart(
    clientName: string[],
    abbreviatedName: string[],
    profitValue: number[],
    billingQuantity: number[],
    billingValue: number[]
  ) {
    this.barChartData = {
      labels: abbreviatedName,
      datasets: [
        {
          data: profitValue,
          label: 'Lucro',
          backgroundColor: '#62c162',
        },
        {
          data: billingQuantity,
          label: 'Quantidade Faturamento',
          backgroundColor: '#27c8ff',
        },
        {
          data: billingValue,
          label: 'Valor Faturamento',
          backgroundColor: '#0c58ff',
        },
      ],
    };
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      plugins: {
        legend: {},
        datalabels: {
          color: '#fff',
          formatter: (value) => {
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
            title: function (context) {
              return clientName[context[0].dataIndex];
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
