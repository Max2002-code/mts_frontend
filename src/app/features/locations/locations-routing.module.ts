import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';

const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: ':id', component: LocationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
