// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { MovementTrackingComponent } from './core/movement-tracking/movement-tracking.component';
import { SearchPositionComponent } from './core/search-position/search-position.component';
import { LoginComponent } from './features/login/login.component';
import { FeaturesLayoutComponent } from './layout/features/features-layout/features-layout.component';
import { title } from 'process';
import { FEATURES_ROUTING } from './shared/routes/features-comp.routing';
import { CoreLayoutComponent } from './layout/core/core-layout/core-layout.component';
import { CORE_ROUTING } from './shared/routes/core-comp.routing';

const routes: Routes = [
  /*{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'movements', component: MovementTrackingComponent },
  { path: 'search', component: SearchPositionComponent },

  // ✅ QUESTA DEVE STARE PRIMA DEL **
  { path: 'tracking/:title', component: MovementTrackingComponent },

  // ❗ SEMPRE PER ULTIMO
  { path: '**', redirectTo: '' }*/

  //logout

  { path: '', component: FeaturesLayoutComponent, data:{title:'features view'}, children:FEATURES_ROUTING },
  { path: '', component:CoreLayoutComponent, data:{title:'core view'}, children:CORE_ROUTING }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
