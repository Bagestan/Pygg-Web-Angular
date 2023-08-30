import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {
  dataSource!: any;
  innerRadius = 0.2;
  chartType!: string;

  palette = ChartsService.palette;
  paletteExtensionMode = ChartsService.paletteExtensionMode;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      console.log(data[0].path);
      this.chartType = data[0].path;
    });

    ChartsService.doughnutChartDataEmitter.subscribe((data) => {
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
      text: `${arg.argument}

      ${arg.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`,
    };
  }
}
