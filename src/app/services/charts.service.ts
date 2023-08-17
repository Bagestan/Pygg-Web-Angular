import { EventEmitter, Injectable } from '@angular/core';
import { ChartFilter } from '../pages/charts/models/chartModels';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static chartDataEmitter = new EventEmitter<ChartFilter>();

  private chartdata!: ChartFilter;

  saveChartData(data: ChartFilter) {
    ChartsService.chartDataEmitter.emit((this.chartdata = data));
  }
}
