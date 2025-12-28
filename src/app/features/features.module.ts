import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { FeaturesPagesRoutingModule } from "./features-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    FormsModule,
    FeaturesPagesRoutingModule,
  ],
  exports: [
    
  ]
})
export class FeaturesModule{}