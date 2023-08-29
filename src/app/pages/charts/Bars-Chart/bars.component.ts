import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';

import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit, AfterViewInit {
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;
  pivotGridDataSource: any;

  dataSource!: any[];
  clientName!: string[];

  customizeTooltip(arg: any) {
    return {
      text: `
      ${arg.originalArgument}

      ${arg.seriesName}: ${arg.valueText}`,
    };
  }

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    ChartsService.barsChartDataEmitter.subscribe((data) => {
      data.forEach((i: any) => {
        i.FIRSTNAME = i.CLIENTNAME.split(' ')[0];
      });

      this.populateChart(data);
    });
  }

  populateChart(data: any) {
    console.log('🚀 ~ data:', data);
    this.dataSource = data;
  }
}
