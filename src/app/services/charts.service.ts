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

  getFirebirdData(startDate: string, endDate: string) {
    return this.firebirdService.getChartData(startDate, endDate);
  }

  getChartData(form: ChartFilter) {
    console.log(form.chartType);
    this.getFirebirdData(form.startDate, form.endDate).subscribe((result) => {
      switch (form.chartType) {
        case 'bar':
          ChartsService.barsChartDataEmitter.emit(
            result.slice(0, form.maxChartItems)
          );

          break;
        case 'stackedBar':
          ChartsService.barsChartDataEmitter.emit(
            result.slice(0, form.maxChartItems)
          );

          break;
        case 'fullStackedBar':
          ChartsService.barsChartDataEmitter.emit(
            result.slice(0, form.maxChartItems)
          );

          break;
        case 'doughnut':
          ChartsService.doughnutChartDataEmitter.emit(
            result.slice(0, form.maxChartItems)
          );
          break;
      }
    });
  }
}
