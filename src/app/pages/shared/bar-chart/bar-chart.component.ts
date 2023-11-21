import { Component, Input } from '@angular/core';

import { DxChartModule } from 'devextreme-angular';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [DxChartModule],
})
export class BarChartComponent {
  @Input() dataSource!: any;
  @Input() title!: string;
  @Input() color!: string;
  @Input() dxolabel = true;
  @Input() dxoLegend = true;
  @Input() argumentFieldArray: [] = [];
  @Input() valueFieldArray: [] = [];

  constructor() {}
}
