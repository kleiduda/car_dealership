import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './account/register/register.component';
import { SigninSignupComponent } from './account/signin-signup/signin-signup.component';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '../shared/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../shared/widget/widget.module';
import { LoginComponent } from './account/login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SigninSignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbNavModule,
    UiModule,
    WidgetModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
