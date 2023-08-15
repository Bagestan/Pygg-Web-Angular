import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataBaseComponent } from './Realtime Database/data-base.component';
import { DataBaseRoutingModule } from './databaserouting.module';

@NgModule({
  declarations: [DataBaseComponent],
  imports: [CommonModule, DataBaseRoutingModule],
})
export class DataBaseModule {}
