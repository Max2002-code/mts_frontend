import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MovementTrackingComponent } from './components/movement-tracking/movement-tracking.component';
import { SearchPositionComponent } from './components/search-position/search-position.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MovementTrackingComponent,
    SearchPositionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
    MatSelectModule
  ],
  exports: [
    MovementTrackingComponent,
    SearchPositionComponent,
  ]
})
export class SharedModule {}
