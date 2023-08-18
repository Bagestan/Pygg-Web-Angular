import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './charts/charts.component';
import { BarsComponent } from './Bars-Chart/Bars.component';
import { DoughnutComponent } from './doughnut-Chart/doughnut.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      { path: 'bars', component: BarsComponent },
      { path: 'doughnut', component: DoughnutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
