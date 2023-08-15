import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { ActionsComponent } from './Modal/actions/actions.component';
import { QualityRoutingModule } from './quality-routing.module';
import { SearchQualityComponent } from './search-quality/search-quality.component';
import { TableQualityComponent } from './table-quality/table-quality.component';
import { ModalQualityComponent } from './Modal/modal-quality.component';
import { FormQualityComponent } from './Modal/form-quality/form-quality.component';

@NgModule({
  declarations: [
    SearchQualityComponent,
    TableQualityComponent,
    ModalQualityComponent,
    ActionsComponent,
    FormQualityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QualityRoutingModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    NzDividerModule,
    NzCheckboxModule,
    NzModalModule,
    NzInputModule,
    NzTabsModule,
    NzElementPatchModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzSpaceModule,
  ],
  providers: [DatePipe],
})
export class QualityModule {}
