import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchQualityComponent } from './search-quality/search-quality.component';
import { TableQualityComponent } from './table-quality/table-quality.component';

const routes: Routes = [
  { path: '', component: SearchQualityComponent },
  { path: 'table', component: TableQualityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityRoutingModule {}
