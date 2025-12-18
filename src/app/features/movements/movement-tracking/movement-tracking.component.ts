import { Component } from '@angular/core';
import { MovementsService } from 'src/app/core/services/movements.service';
import { Movement } from 'src/app/core/models/mov';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent {

  query = '';
  movement: Movement | null = null; 
  searched = false;

  constructor(private movService: MovementsService) {}

  search(): void {
    this.movement = this.movService.getMovements(this.query);
    this.searched = true;
  }
}
