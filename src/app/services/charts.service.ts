import { EventEmitter, Injectable } from '@angular/core';
import { ChartDataType, ChartFilter } from '../pages/charts/models/chartModels';
import { FireBirdService } from './firebird.service';
import { ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static barsChartDataEmitter = new EventEmitter();

  constructor(private firebirdService: FireBirdService) {}

  getFirebirdData(startDate: string, endDate: string) {
    return this.firebirdService.getChartData(startDate, endDate);
  }

  getDoughnutChartData(data: ChartFilter) {
    const result = this.getFirebirdData(data.startDate, data.endDate);
  }

  getBarsChartData(data: ChartFilter) {
    this.getFirebirdData(data.startDate, data.endDate).subscribe((result) => {
      const chartDataSet = {
        label: Object.values(
          result.map((item) => item.NOME_CLIENTE).slice(0, data.maxChartItems)
        ),

        abbreviatedLabel: Object.values(
          result
            .map((item) => item.NOME_CLIENTE.split(' ')[0])
            .slice(0, data.maxChartItems)
        ),

        datasets: [
          {
            data: Object.values(
              result.map((item) => item.LUCRO).slice(0, data.maxChartItems)
            ),
            label: 'Lucro',
            backgroundColor: '#62c162',
          },

          {
            data: Object.values(
              result
                .map((item) => item.QUANTIDADE_FATURAMENTO)
                .slice(0, data.maxChartItems)
            ),
            label: 'Quantidade Faturamento',
            backgroundColor: '#27c8ff',
          },

          {
            data: Object.values(
              result
                .map((item) => item.VALOR_FATURAMENTO)
                .slice(0, data.maxChartItems)
            ),
            label: 'Quantidade Faturamento',
            backgroundColor: '#0c58ff',
          },
        ],
        chartType: data.chartType,
      };
      this.saveChartData(chartDataSet);
    });
  }

  saveChartData(chartDataSet: ChartDataType) {
    ChartsService.barsChartDataEmitter.emit(chartDataSet);
  }
}
