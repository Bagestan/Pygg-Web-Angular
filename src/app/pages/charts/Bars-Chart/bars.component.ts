import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent, DxPivotGridComponent } from 'devextreme-angular';

import { ChartsService } from 'src/app/services/charts.service';
import { ChartDataType } from '../models/chartModels';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit, AfterViewInit {
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;
  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid!: DxPivotGridComponent;

  pivotGridDataSource!: any;

  constructor() {}

  ngOnInit() {
    ChartsService.barsChartDataEmitter.subscribe((data) => {
      this.populateChart(data);
    });
  }

  populateChart(data: ChartDataType) {
    this.pivotGridDataSource = {
      fields: [],
      store: [],
    };
  }

  //

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false,
    });
  }

  customizeTooltip(args: any) {
    return {
      html: `${args.seriesName} | Total<div class='currency'>${args.valueText}</div>`,
    };
  }
}
//
// {
//   caption: 'Region',
//   width: 120,
//   dataField: 'region',
//   area: 'row',
//   sortBySummaryField: 'Total',
// },
// {
//   caption: 'City',
//   dataField: 'city',
//   width: 150,
//   area: 'row',
// },
// {
//   dataField: 'date',
//   dataType: 'date',
//   area: 'column',
// },
// {
//   groupName: 'date',
//   groupInterval: 'month',
//   visible: false,
// },
// {
//   caption: 'Total',
//   dataField: 'amount',
//   dataType: 'number',
//   summaryType: 'sum',
//   format: 'currency',
//   area: 'data',
// },
// {
//   summaryType: 'count',
//   area: 'data',
// },
