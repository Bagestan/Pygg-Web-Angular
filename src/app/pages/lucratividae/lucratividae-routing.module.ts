import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoughnutComponent } from './doughnut-Chart/doughnut.component';
import { BarsComponent } from './Bars-Chart/bars.component';
import { LucratividadeComponent } from './lucratividae.component';

const routes: Routes = [
  {
    path: '',
    component: LucratividadeComponent,
    children: [
      { path: 'bar', component: BarsComponent },
      { path: 'stackedBar', component: BarsComponent },
      { path: 'fullStackedBar', component: BarsComponent },
      { path: 'doughnut', component: DoughnutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LucratividadeRoutingModule {}
