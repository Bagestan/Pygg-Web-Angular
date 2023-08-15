import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitByClientComponent } from './profit-by-client/profit-by-client.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [{ path: 'bars', component: ProfitByClientComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
