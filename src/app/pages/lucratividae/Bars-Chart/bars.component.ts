import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxChartComponent } from 'devextreme-angular';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ChartsService } from 'src/app/services/charts.service';
import { Subject, takeUntil } from 'rxjs';
import { ChartFilter } from '../utils/chartModels';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  protected destroy$: Subject<void> = new Subject<void>();

  dataSource!: any;
  clientName!: string[];
  argumentField!: string;
  xAxis: string = '';
  chartTitle = '';

  constructor(private message: NzMessageService, private router: Router) {}

  ngOnInit(): void {
    ChartsService.barsChartDataEmitter
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.dataSource = data;
            this.xAxis = this.dataSource[0].firstName
              ? 'firstName'
              : 'argumentField';
          } else {
            this.message.info('Nenhum Registro encontrado');
          }
        },
      });
    ChartsService.formEmitter.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: ChartFilter) => {
        const chartTitleMap: { [key: string]: string } = {
          resultByClient: (this.chartTitle = 'Resultado por Cliente'),
          resultByTreatment: (this.chartTitle = 'Resultado por Beneficiamento'),
          resultByState: (this.chartTitle = 'Resultado por Estado'),
          resultBySector: (this.chartTitle = 'Resultado por Ramo de Atividade'),
        };

        this.chartTitle = chartTitleMap[data.chartData];
        console.log('🚀 ~ this.chartTitle:', this.chartTitle);
      },
    });
  }

  customizeTooltip(arg: any) {
    const tooltipTxt = {
      text: `${arg.point.data.argumentField}

      ${arg.seriesName}:`,
    };

    const tooltipTextMap: { [key: string]: string } = {
      Lucro: ` ${arg.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'BRL',
      })}`,

      'Valor de Faturamento': ` ${arg.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'BRL',
      })}`,

      'Quantidade de Faturamento': ` ${arg.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 0,
      })}`,

      'Porcentagem de Lucro': ` ${arg.value.toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
      })}%`,
    };

    tooltipTxt.text += tooltipTextMap[arg.seriesName];

    console.log('🚀 ~ tooltipTxt:', tooltipTxt);
    return tooltipTxt;
  }
}
