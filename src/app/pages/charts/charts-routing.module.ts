import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoughnutComponent } from './doughnut-Chart/doughnut.component';
import { ChartsComponent } from './charts.component';
import { BarsComponent } from './Bars-Chart/bars.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      { path: 'bar', component: BarsComponent },
      { path: 'stackedBar', component: BarsComponent },
      { path: 'fullStackedBar', component: BarsComponent },
      { path: 'doughnut', component: DoughnutComponent },
      { path: 'individualDoughnut', component: DoughnutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
