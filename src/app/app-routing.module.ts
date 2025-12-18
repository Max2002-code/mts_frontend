// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MovementTrackingComponent } from './shared/components/movement-tracking/movement-tracking.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'movements', loadChildren: () => import('./features/movements/movements.module').then(m => m.MovementsModule) },
  { path: 'search', loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule) },

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
