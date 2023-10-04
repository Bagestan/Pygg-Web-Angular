import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintingTrackerComponent } from './printing-production-tracker/printing-tracker.component';

const routes: Routes = [{ path: '', component: PrintingTrackerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductivityRoutingModule {}
