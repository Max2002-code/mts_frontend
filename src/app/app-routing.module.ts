// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { FeaturesLayoutComponent } from './layout/features/features-layout/features-layout.component';
import { FEATURES_ROUTING } from './shared/routes/features-comp.routing';
import { CoreLayoutComponent } from './layout/core/core-layout/core-layout.component';
import { CORE_ROUTING } from './shared/routes/core-comp.routing';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { LogoutComponent } from './features/logout/logout.component';
import { ErrorComponent } from './features/error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  //logout
  { path:'logout', component: LogoutComponent },

  { path: '', component:CoreLayoutComponent, data:{title:'core view'}, children:CORE_ROUTING, canActivate:[AuthGuardService]},
  { path: '', component: FeaturesLayoutComponent, data:{title:'features view'}, children:FEATURES_ROUTING },
  
  { path: '**', component:ErrorComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
