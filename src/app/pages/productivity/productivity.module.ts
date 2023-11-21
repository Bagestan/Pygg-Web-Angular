import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrintingTrackerComponent } from './printing-production-tracker/printing-tracker.component';
import { ProductivityRoutingModule } from './productivity-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { DxChartModule } from 'devextreme-angular';
import { BarChartComponent } from '../shared/bar-chart/bar-chart.component';

@NgModule({
  declarations: [PrintingTrackerComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    ProductivityRoutingModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzGridModule,
    NzCollapseModule,
    NzIconModule,
    NzDividerModule,
    NzTypographyModule,
    DxChartModule,
    BarChartComponent,
  ],
})
export class ProductivityModule {}
