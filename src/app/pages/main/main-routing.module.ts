import { NgModule, inject } from '@angular/core';
import { MainComponent } from './main.component';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { QualityModule } from '../quality/quality.module';
import { CalcDensidadeModule } from '../calcDensidade/calc-densidade.module';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/app/services/AuthService';
import { ChartsModule } from '../charts/charts.module';
import { DataBaseModule } from '../database/database.module';

const authGuardFn: CanActivateFn = () => {
  const isPermission = inject(AuthService);
  return isPermission.getIsPermission();
};

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'charts' },
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
        path: 'calc',
        loadChildren: () =>
          import('../calcDensidade/calc-densidade.module').then(
            () => CalcDensidadeModule
          ),
        canActivate: [authGuardFn],
      },
      {
        path: 'db',
        loadChildren: () =>
          import('../database/database.module').then(() => DataBaseModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('../charts/charts.module').then(() => ChartsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
