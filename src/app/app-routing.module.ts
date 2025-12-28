// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { MovementTrackingComponent } from './core/movement-tracking/movement-tracking.component';
import { SearchPositionComponent } from './core/search-position/search-position.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },

  { path: 'movements', component: MovementTrackingComponent },
  { path: 'search', component: SearchPositionComponent },

  // ✅ QUESTA DEVE STARE PRIMA DEL **
  { path: 'tracking/:title', component: MovementTrackingComponent },

  // ❗ SEMPRE PER ULTIMO
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
