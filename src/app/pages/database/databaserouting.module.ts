import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataBaseComponent } from './DatabaseConfig/data-base.component';

const routes: Routes = [{ path: '', component: DataBaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataBaseRoutingModule {}
