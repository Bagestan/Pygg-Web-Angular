import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  chartDataEmitter = new EventEmitter<string[]>();
  private chartdata!: string[];

  saveChartData(data: string[]) {
    this.chartdata = data;
    this.chartDataEmitter.emit(data);
  }

  getChartData() {}
  constructor() {}
}
