import { EventEmitter, Injectable } from '@angular/core';
import { ChartDataType, ChartFilter } from '../pages/charts/models/chartModels';
import { FireBirdService } from './firebird.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  static barsChartDataEmitter = new EventEmitter();
  static doughnutChartDataEmitter = new EventEmitter<ChartDataType>();

  constructor(private firebirdService: FireBirdService) {}

  getChartData(startDate: string, endDate: string) {
    return this.firebirdService.getChartData(startDate, endDate);
  }

  getDoughnutChartData(data: ChartFilter) {
    this.getBarsChartData(data);
    // return this.getChartData(data.startDate, data.endDate).subscribe(
    //   (result) => {
    //     console.log(result);
    //   }
    // );
  }

  getBarsChartData(data: ChartFilter) {
    this.getChartData(data.startDate, data.endDate).subscribe((result) => {
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
            // backgroundColor: ['#62c162', '#27c8ff', '#0c58ff'],
          },

          {
            data: Object.values(
              result
                .map((item) => item.QUANTIDADE_FATURAMENTO)
                .slice(0, data.maxChartItems)
            ),
            label: 'Quantidade Faturamento',
            // backgroundColor: '#27c8ff',
          },

          {
            data: Object.values(
              result
                .map((item) => item.VALOR_FATURAMENTO)
                .slice(0, data.maxChartItems)
            ),
            label: 'Quantidade Faturamento',
            // backgroundColor: '#0c58ff',
          },
        ],
        chartType: data.chartType,
      };
      ChartsService.barsChartDataEmitter.emit(chartDataSet);
    });
  }
}
