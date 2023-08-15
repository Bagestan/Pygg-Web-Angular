import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { AuthModule } from './pages/auth/auth.module';
import { MainModule } from './pages/main/main.module';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('auth');
const redirectUnauthorizedToMain = () => redirectLoggedInTo('main');

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(() => AuthModule),
    ...canActivate(redirectUnauthorizedToMain),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then(() => MainModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
