import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChartsService } from 'src/app/services/charts.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {
  protected destroy$: Subject<void> = new Subject<void>();

  dataSource!: any;
  innerRadius = 0.2;
  chartType!: string;

  palette = ChartsService.palette;
  paletteExtensionMode = ChartsService.paletteExtensionMode;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.chartType = data[0].path;
    });

    ChartsService.doughnutChartDataEmitter
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.populateChart(data);
      });
  }

  populateChart(data: any) {
    this.dataSource = data;
  }

  customizeTooltip(arg: any) {
    return {
      text: `${arg.argument}

      ${arg.seriesName}

      ${arg.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`,
    };
  }
}
