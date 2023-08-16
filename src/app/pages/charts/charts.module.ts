import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsRoutingModule } from './charts-routing.module';
import { ProfitByClientComponent } from './profit-by-client/profit-by-client.component';
import { ChartsComponent } from './charts/charts.component';

import { NgChartsModule } from 'ng2-charts';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [ProfitByClientComponent, ChartsComponent],
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    ChartsRoutingModule,
    NgChartsModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
  ],
  providers: [DatePipe],
})
export class ChartsModule {}
