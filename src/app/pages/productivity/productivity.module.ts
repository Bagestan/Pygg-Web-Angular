import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrintingTrackerComponent } from './printing-production-tracker/printing-tracker.component';
import { ProductivityRoutingModule } from './productivity-routing.module';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DxChartModule } from 'devextreme-angular';
import { SharedModule } from '../shared/shared.module';

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
    DxChartModule,
  ],
})
export class ProductivityModule {}
