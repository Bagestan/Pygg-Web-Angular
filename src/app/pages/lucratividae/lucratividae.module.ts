import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BarsComponent } from './Bars-Chart/bars.component';
import { DoughnutComponent } from './doughnut-Chart/doughnut.component';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { LucratividadeComponent } from './lucratividae.component';
import { LucratividadeRoutingModule } from './lucratividae-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BarChartComponent } from '../shared/bar-chart/bar-chart.component';

@NgModule({
  declarations: [BarsComponent, LucratividadeComponent, DoughnutComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule,
    LucratividadeRoutingModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    NzSelectModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzSwitchModule,
    NzCascaderModule,
    DxChartModule,
    DxPieChartModule,
    BarChartComponent,
  ],
  providers: [DatePipe],
})
export class LucratividadeModule {}
