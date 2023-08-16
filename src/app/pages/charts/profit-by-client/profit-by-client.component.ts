import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FireBirdService } from 'src/app/services/firebird.service';
import { ChartsService } from '../../../services/charts.service';

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

  maxChartItems = 10;

  constructor(private firebirdService: FireBirdService) {}

  ngOnInit(): void {
    ChartsService.chartDataEmitter.subscribe((data) => this.getChartData(data));
  }

  startDate!: string;
  endDate!: string;

  getChartData(data: string[]) {
    this.firebirdService.getChartData(data[0], data[1]).subscribe((result) => {
      console.log(result);

      const clientName = Object.values(
        result.map((item) => item.NM_CLI).slice(0, this.maxChartItems)
      );
      const profitValue = Object.values(
        result.map((item) => item.LUC).slice(0, this.maxChartItems)
      );
      const billingQuantity = Object.values(
        result.map((item) => item.Q_FAT).slice(0, this.maxChartItems)
      );
      const billingValue = Object.values(
        result.map((item) => item.V_FAT).slice(0, this.maxChartItems)
      );

      this.populateChart(
        clientName,
        profitValue,
        billingQuantity,
        billingValue
      );
    });
  }

  populateChart(
    clientName: string[],
    profitValue: number[],
    billingQuantity: number[],
    billingValue: number[]
  ) {
    this.barChartData = {
      labels: clientName,
      datasets: [
        {
          data: profitValue,
          label: 'Lucro',
        },
        {
          data: billingQuantity,
          label: 'Quantidade Faturamento',
        },
        {
          data: billingValue,
          label: 'Valor Faturamento',
        },
      ],
    };
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {},
      },
      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
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
