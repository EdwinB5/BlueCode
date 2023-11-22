import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { ContactComponent } from './modules/contact/contact.component';
import { CustomErrorComponent } from './modules/custom-error/custom-error.component';
import { HomeComponent } from './modules/home/home.component';
import { OurServicesComponent } from './modules/our-services/our-services.component';
import { PoliticsComponent } from './modules/politics/politics.component';
import { ButtonGridComponent } from './shared/components/button-grid/button-grid.component';
import { ButtonTableComponent } from './shared/components/button-table/button-table.component';
import { CursorBlinkDirective } from './shared/directives/cursor-blink.directive';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'

import { environment } from '../environments/environment';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarVerticalComponent } from './core/components/navbar-vertical/navbar-vertical.component';
import { NavbarHorizontalComponent } from './core/components/navbar-horizontal/navbar-horizontal.component';
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ModifyComponent } from './modules/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PoliticsComponent,
    OurServicesComponent,
    CustomErrorComponent,
    ContactComponent,
    ButtonGridComponent,
    ButtonTableComponent,
    CursorBlinkDirective,
    FooterComponent,
    NavbarVerticalComponent,
    NavbarHorizontalComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
