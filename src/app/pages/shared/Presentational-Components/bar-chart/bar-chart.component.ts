import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges {
  @Input() dataSource!: any;
  @Input() title!: string;
  @Input() color!: string;

  constructor() {
    this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges) {}
}
