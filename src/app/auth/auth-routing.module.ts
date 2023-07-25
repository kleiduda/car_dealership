import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { SigninSignupComponent } from './account/signin-signup/signin-signup.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin-signup',
    component: SigninSignupComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
