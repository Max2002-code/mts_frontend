import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeaturesPagesRoutingModule } from "./features-routing.module";
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from "@angular/common";
import { ChangePwComponent } from "../client/change-pw/change-pw.component";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    ChangePwComponent,
    UnauthorizedComponent
  ],
  imports: [
    FormsModule,
    FeaturesPagesRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
  ],
  exports: [
    
  ]
})
export class FeaturesModule{}