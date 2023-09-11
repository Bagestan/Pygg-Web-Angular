import { EventEmitter, Injectable } from '@angular/core';
import { ChartFilter, ProfitData } from '../pages/charts/models/chartModels';
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
    this.getFirebirdData(form).subscribe((result) => {
      console.log('🚀 ~ result:', result);

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
    });
  }

  chartDataEmitter(form: ChartFilter, chartData: any[]) {
    console.log(form.maxChartItems);

    const unicClient = new Set();
    const limitedClients = [];

    for (const item of chartData) {
      if (!unicClient.has(item.name)) {
        limitedClients.push(item);
        unicClient.add(item.name);
      }
      if (
        limitedClients.length >= form.maxChartItems &&
        form.maxChartItems != 0
      ) {
        break;
      }
    }

    switch (form.chartType) {
      case 'bar':
        ChartsService.barsChartDataEmitter.emit(limitedClients);
        break;

      case 'stackedBar':
        ChartsService.barsChartDataEmitter.emit(limitedClients);
        break;

      case 'fullStackedBar':
        ChartsService.barsChartDataEmitter.emit(limitedClients);
        break;

      case 'doughnut':
        ChartsService.doughnutChartDataEmitter.emit(limitedClients);
        break;

      case 'pivotGrid':
        ChartsService.barsChartDataEmitter.emit(limitedClients);
        break;
    }
  }
}
