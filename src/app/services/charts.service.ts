import { EventEmitter, Injectable } from '@angular/core';
import { ChartFilter } from '../pages/charts/models/chartModels';
import { FireBirdService } from './firebird.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static barsChartDataEmitter = new EventEmitter();
  static doughnutChartDataEmitter = new EventEmitter();

  static palette = 'Ocean';
  static paletteExtensionMode = 'Blend';

  constructor(private firebirdService: FireBirdService) {}

  getFirebirdData(form: ChartFilter) {
    return this.firebirdService.getChartData(form);
  }

  getChartData(form: ChartFilter) {
    this.getFirebirdData(form).subscribe({
      next: (result) => {
        const chartData = result.map((object) => {
          return {
            name: object.CLIENTNAME,
            firstName: object.CLIENTNAME.split(' ')[0],
            date: object.D_DOC?.split('T')[0],
            BillingQuantity: object.BILLINGQUANTITY,
            BillingValue: object.BILLINGVALUE,
            Profit: object.PROFITVALUE,
            maxChartItems: form.maxChartItems,
          };
        });

        this.chartDataEmitter(form, chartData);
      },
      error: (e) => console.log(e),
    });
  }

  chartDataEmitter(form: ChartFilter, chartData: any[]) {
    switch (form.chartType) {
      case 'bar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;

      case 'stackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;

      case 'fullStackedBar':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;

      case 'doughnut':
        ChartsService.doughnutChartDataEmitter.emit(chartData);
        break;

      case 'pivotGrid':
        ChartsService.barsChartDataEmitter.emit(chartData);
        break;
    }
  }
}
