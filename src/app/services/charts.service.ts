import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  chartInfo: any;

  saveChartInfo(data: any) {
    this.chartInfo = data;
  }

  getChartInfo() {
    return this.chartInfo;
  }
  constructor() {}
}
