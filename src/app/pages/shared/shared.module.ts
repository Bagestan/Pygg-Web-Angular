import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DxChartModule } from 'devextreme-angular';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DxChartModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzDividerModule,
  ],
  exports: [],
})
export class SharedModule {}
