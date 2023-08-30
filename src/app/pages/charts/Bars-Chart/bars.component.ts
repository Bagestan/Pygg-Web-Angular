import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxChartComponent } from 'devextreme-angular';

import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  dataSource!: [];
  clientName!: string[];
  chartType!: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      this.chartType = data[0].path;
    });

    ChartsService.barsChartDataEmitter.subscribe((data) => {
      console.log('🚀 ~ data:', data);
      data.forEach((i: any) => {
        i.FIRSTNAME = i.CLIENTNAME.split(' ')[0];
      });

      this.populateChart(data);
    });
  }

  populateChart(data: any) {
    this.dataSource = data;
  }

  customizeTooltip(arg: any) {
    return {
      text: `
      ${arg.point.data.CLIENTNAME}

      ${arg.seriesName}: ${arg.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`,
    };
  }
}
