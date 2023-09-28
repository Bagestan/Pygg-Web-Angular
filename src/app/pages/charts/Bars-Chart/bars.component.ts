import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxChartComponent } from 'devextreme-angular';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'bars-chart',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
})
export class BarsComponent implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  dataSource!: any;
  clientName!: string[];
  chartType!: string;

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      this.chartType = data[0].path;
    });

    ChartsService.barsChartDataEmitter.subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.dataSource = data;
        } else {
          this.message.error('Nenhum registro encontrado');
          this.router.navigate(['main/charts']);
        }
      },
    });
  }

  customizeTooltip(arg: any) {
    return {
      text: `
      ${arg.point.data.argumentField}

      ${arg.seriesName}: ${arg.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`,
    };
  }
}
