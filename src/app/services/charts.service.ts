import { EventEmitter, Injectable } from '@angular/core';
import { ChartFilter } from '../pages/charts/models/chartModels';
import { FireBirdService } from './firebird.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static barsChartDataEmitter = new EventEmitter();

  constructor(private firebirdService: FireBirdService) {}

  getFirebirdData(startDate: string, endDate: string) {
    return this.firebirdService.getChartData(startDate, endDate);
  }

  getChartData(form: ChartFilter) {
    this.getFirebirdData(form.startDate, form.endDate).subscribe((result) => {
      ChartsService.barsChartDataEmitter.emit(result);
    });
  }
}
