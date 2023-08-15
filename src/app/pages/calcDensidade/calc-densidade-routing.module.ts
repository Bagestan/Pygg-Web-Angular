import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcDensidadeComponent } from './calc-densidade.component';

const routes: Routes = [{ path: '', component: CalcDensidadeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalcDensidadeRoutingModule {}
