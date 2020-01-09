import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateComponent } from '../pages/private/private.component';
import { NotFound404Component } from '../pages/not-found404/not-found404.component';
import {
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth-service';
import { GuardService } from './services/guard-service';
import { Forbidden403Component } from '../pages/forbidden403/forbidden403.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { BadRequest400Component } from '../../src/pages/bad-request400/bad-request400.component';
import { SilentRefreshComponent } from '../pages/silent-refresh/silent-refresh.component';
import { OAuthModule } from 'angular-oauth2-oidc';

const modules: any[] = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  BrowserAnimationsModule,
  MatCardModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  HttpClientModule,
  NgxSpinnerModule,
  AngularFireAuthModule,
  OAuthModule.forRoot() 
];

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'private',
    component: PrivateComponent,
    data: { title: 'Private' },
    canActivate: [GuardService]
  },
  {
    path: 'silent_renew',
    component: SilentRefreshComponent,
    data: { title: 'silent_renew' },
    canActivate: [GuardService]
  },
  {
    path: '400',
    component: BadRequest400Component,
    data: { title: '400' }
  },
  {
    path: '403',
    component: Forbidden403Component,
    data: { title: '403' }
  },
  {
    path: '404',
    component: NotFound404Component,
    data: { title: '404' }
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrivateComponent,
    NotFound404Component,
    Forbidden403Component,
    HeaderComponent,
    BadRequest400Component,
    SilentRefreshComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    [...modules]
  ],
  providers: [AuthService, GuardService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}