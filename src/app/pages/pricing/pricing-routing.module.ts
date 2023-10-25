import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pricing.component';
import { PriceFormationComponent } from './price-formation/price-formation.component';
import { FinalPriceComponent } from './final-price/final-price.component';

const routes: Routes = [
  { path: '', component: PricingComponent },
  { path: 'formation', component: PriceFormationComponent },
  { path: 'final', component: FinalPriceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingRoutingModule {}
