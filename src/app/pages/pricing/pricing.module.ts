import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PricingRoutingModule } from './pricing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PricingComponent } from './pricing.component';
import { PriceFormationComponent } from './price-formation/price-formation.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';

import { NgxMaskModule } from 'ngx-mask';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [PricingComponent, PriceFormationComponent],
  imports: [
    ProductComponent,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PricingRoutingModule,
    NzPageHeaderModule,
    NzCardModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzElementPatchModule,
    NzToolTipModule,
    NzSelectModule,
    NzIconModule,
    NzAvatarModule,
    NzButtonModule,
    NzTypographyModule,
    NzModalModule,
    NzListModule,
    NzDividerModule,
    NzImageModule,
    NgxMaskModule.forChild(),
  ],
})
export class PricingModule {}
