import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './Presentational-Components/bar-chart/bar-chart.component';

import { DxChartModule } from 'devextreme-angular';

@NgModule({
  declarations: [BarChartComponent],
  imports: [CommonModule, DxChartModule],
  exports: [BarChartComponent],
})
export class SharedModule {}
