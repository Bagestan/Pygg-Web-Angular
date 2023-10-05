import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxChartComponent } from 'devextreme-angular';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ChartsService } from 'src/app/services/charts.service';
import { Subject } from 'rxjs';
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
    ChartsService.barsChartDataEmitter.subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.dataSource = data;
          this.xAxis = this.dataSource[0].firstName
            ? 'firstName'
            : 'argumentField';
        } else {
          this.message.error('Nenhum registro encontrado');
        }
      },
    });
    ChartsService.formEmitter.subscribe({
      next: (data: ChartFilter) => {
        this.chartTitle = data.chartData;

        switch (data.chartData) {
          case 'resultByClient':
            this.chartTitle = 'Resultado por Cliente';
            break;

          case 'resultByTreatment':
            this.chartTitle = 'Resultado por Beneficiamento';
            break;

          case 'resultByState':
            this.chartTitle = 'Resultado por Estado';
            break;

          case 'resultBySector':
            this.chartTitle = 'Resultado por Ramo de Atividade';
            break;

          default:
            this.chartTitle = 'Grafico';
            break;
        }
      },
    });
  }

  customizeTooltip(arg: any) {
    const tooltipTxt = {
      text: `${arg.point.data.argumentField}

      ${arg.seriesName}:`,
    };
    switch (arg.seriesName) {
      case 'Lucro':
        tooltipTxt.text += ` ${arg.value.toLocaleString('pt-BR', {
          maximumFractionDigits: 0,
          style: 'currency',
          currency: 'BRL',
        })}`;
        break;

      case 'Valor de Faturamento':
        tooltipTxt.text += ` ${arg.value.toLocaleString('pt-BR', {
          maximumFractionDigits: 0,
          style: 'currency',
          currency: 'BRL',
        })}`;
        break;

      case 'Quantidade de Faturamento':
        tooltipTxt.text += ` ${arg.value.toLocaleString('pt-BR', {
          maximumFractionDigits: 0,
        })}`;
        break;

      case 'Porcentagem de Lucro':
        tooltipTxt.text += ` ${arg.value.toLocaleString('pt-BR', {
          maximumFractionDigits: 2,
        })}%`;
        break;

      default:
        break;
    }

    return tooltipTxt;
  }
}
