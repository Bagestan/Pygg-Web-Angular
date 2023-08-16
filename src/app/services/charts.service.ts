import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static chartDataEmitter = new EventEmitter<string[]>();

  private chartdata!: string[];

  saveChartData(data: string[]) {
    ChartsService.chartDataEmitter.emit((this.chartdata = data));
  }
}
