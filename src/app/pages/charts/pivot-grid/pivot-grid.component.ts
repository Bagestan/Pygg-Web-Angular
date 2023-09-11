import { Component, ViewChild } from '@angular/core';
import { DxChartComponent, DxPivotGridComponent } from 'devextreme-angular';
import { ChartsService } from 'src/app/services/charts.service';
import { ProfitData } from '../models/chartModels';

@Component({
  selector: 'app-pivot-grid',
  templateUrl: './pivot-grid.component.html',
  styleUrls: ['./pivot-grid.component.scss'],
})
export class PivotGridComponent {
  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid!: DxPivotGridComponent;

  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  pivotGridDataSource: any;

  constructor() {
    this.customizeTooltip = this.customizeTooltip.bind(this);
  }

  ngOnInit(): void {
    ChartsService.barsChartDataEmitter.subscribe((data: ProfitData[]) => {
      this.getChartData(data);
    });
  }

  getChartData(data: any[]) {
    console.log('🚀 ~ data:', data);

    this.pivotGridDataSource = {
      fields: [
        {
          caption: 'Nome',
          dataField: 'firstName',
          width: 120,
          area: 'row',
        },
        {
          caption: `Quantidade
          Faturamento`,
          dataField: 'BillingQuantity',
          summaryType: 'sum',
          allowSorting: true,
          format: { type: 'largenumber', precision: 2 },
          area: 'data',
        },
        {
          caption: `Valor
          Faturamento`,
          dataField: 'BillingValue',
          summaryType: 'sum',
          allowSorting: true,
          format: { type: 'largenumber', precision: 2 },
          area: 'data',
        },
        {
          caption: 'Lucro',
          dataField: 'Profit',
          allowSorting: true,
          summaryType: 'sum',
          format: { type: 'largenumber', precision: 2 },
          area: 'data',
        },
        {
          caption: 'Data',
          dataField: 'date',
          allowSorting: true,
          dataType: 'date',
          area: 'column',
        },
      ],
      store: data,
    };
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
    });
  }

  customizeTooltip(arg: any) {
    const seriesName =
      arg.seriesName.split(' | ')[1] === 'Quantidade Faturamento'
        ? numberFormatterPtBR(arg.value)
        : numberFormatterBRL(arg.value);
    return {
      text: `${arg.seriesName}

      ${seriesName}
       `,
    };
  }
}

function numberFormatterPtBR(value: number) {
  return value.toLocaleString('pt-BR', {
    maximumFractionDigits: 0,
  });
}

function numberFormatterBRL(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
