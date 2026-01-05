import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FeaturesPagesRoutingModule } from "./features-routing.module";
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
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