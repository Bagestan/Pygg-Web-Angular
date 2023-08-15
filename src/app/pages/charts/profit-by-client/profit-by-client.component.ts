import { Component, ViewChild } from '@angular/core';
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
export class ProfitByClientComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData!: ChartData<'bar'>;

  constructor(
    private firebirdService: FireBirdService,
    private chartsService: ChartsService
  ) {
    this.getChartData();
  }

  startDate!: string;
  endDate!: string;

  getChartData() {
    console.log(this.chartsService.getChartInfo());

    // this.firebirdService
    //   .getChartData(this.chartsService.startDate, this.chartsService.endDate)
    //   .subscribe((data) => {
    //     const clientName = Object.values(data.map((item) => item.NM_CLI));
    //     const profitValue = Object.values(data.map((item) => item.LUC));
    //     const billingQuantity = Object.values(data.map((item) => item.Q_FAT));
    //     const billingValue = Object.values(data.map((item) => item.V_FAT));
    //     this.populateChart(
    //       clientName,
    //       profitValue,
    //       billingQuantity,
    //       billingValue
    //     );
    //   });
  }

  populateChart(
    clientName: string[],
    profitValue: number[],
    billingQuantity: number[],
    billingValue: number[]
  ) {
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {},
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
      },
    };

    this.barChartData = {
      labels: clientName,
      datasets: [
        { data: profitValue, label: 'Lucro' },
        { data: billingQuantity, label: 'Quantidade Faturamento' },
        { data: billingValue, label: 'Valor Faturamento' },
      ],
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
