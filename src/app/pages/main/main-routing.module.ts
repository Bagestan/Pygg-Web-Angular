import { NgModule, inject } from '@angular/core';
import { MainComponent } from './main.component';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { QualityModule } from '../quality/quality.module';
import { UserModule } from '../user/user.module';
import { DataBaseModule } from '../database/database.module';
import { AuthService } from 'src/app/services/auth.service';
import { LucratividadeModule } from '../lucratividae/lucratividae.module';
import { ProductivityModule } from '../productivity/productivity.module';
import { CalcDensidadeComponent } from '../calcDensidade/calc-densidade.component';
import { PricingModule } from '../pricing/pricing.module';

const authGuardFn: CanActivateFn = () => {
  const isPermission = inject(AuthService);
  return isPermission.getIsPermission();
};

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pricing' },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(() => UserModule),
      },
      {
        path: 'quality',
        loadChildren: () =>
          import('../quality/quality.module').then(() => QualityModule),
      },
      {
        path: 'db',
        loadChildren: () =>
          import('../database/database.module').then(() => DataBaseModule),
      },
      {
        path: 'lucratividade',
        loadChildren: () =>
          import('../lucratividae/lucratividae.module').then(
            () => LucratividadeModule
          ),
      },
      {
        path: 'productivity',
        loadChildren: () =>
          import('../productivity/productivity.module').then(
            () => ProductivityModule
          ),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('../pricing/pricing.module').then(() => PricingModule),
      },
      {
        path: 'calc',
        component: CalcDensidadeComponent,
        canActivate: [authGuardFn],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
