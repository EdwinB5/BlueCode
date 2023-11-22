import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { CustomErrorComponent } from './modules/custom-error/custom-error.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { OurServicesComponent } from './modules/our-services/our-services.component';
import { PoliticsComponent } from './modules/politics/politics.component';
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { NoAuthGuard } from './shared/guard/no-auth.guard';
import { ModifyComponent } from './modules/modify/modify.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'politics', component: PoliticsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'our-services', component: OurServicesComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [NoAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/user/modify', component: ModifyComponent, canActivate: [AuthGuard]},
  { path: '**', component: CustomErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
