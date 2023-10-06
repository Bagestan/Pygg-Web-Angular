import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalcDensidadeComponent } from './calc-densidade.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormatNumberPipe } from 'src/app/services/utils/format-number.pipe';
import { SuffixPipe } from 'src/app/services/utils/suffix.pipe';

@NgModule({
  declarations: [CalcDensidadeComponent, SuffixPipe, FormatNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDividerModule,
    NzResultModule,
    NzLayoutModule,
    NzIconModule,
    NzListModule,
  ],
  exports: [CalcDensidadeComponent],
})
export class CalcDensidadeModule {}
