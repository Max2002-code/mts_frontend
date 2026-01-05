import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeaturesPagesRoutingModule } from "./features-routing.module";
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
  ],
  imports: [
    FormsModule,
    FeaturesPagesRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    
  ]
})
export class FeaturesModule{}