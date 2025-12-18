// src/app/features/movements/movements.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MovementFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    SharedModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule {}
