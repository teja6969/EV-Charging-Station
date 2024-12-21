import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { VendorHomePageComponent } from './modules/vendor/vendor-home-page/vendor-home-page.component';
import { UserHomePageComponent } from './modules/user/user-home-page/user-home-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'vendor-landing', component: VendorHomePageComponent },
  { path: 'user-landing', component: UserHomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
