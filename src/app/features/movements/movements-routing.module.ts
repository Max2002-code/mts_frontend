// src/app/features/movements/movements-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementTrackingComponent } from 'src/app/shared/components/movement-tracking/movement-tracking.component';
import { MovementFormComponent } from './movement-form/movement-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracking', pathMatch: 'full' },
  { path: 'tracking', component: MovementTrackingComponent },
  { path: 'form', component: MovementFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule {}
