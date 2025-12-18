import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

// Componenti
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { MatListModule } from '@angular/material/list';

// Routing
import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  declarations: [
    LocationListComponent,
    LocationDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
