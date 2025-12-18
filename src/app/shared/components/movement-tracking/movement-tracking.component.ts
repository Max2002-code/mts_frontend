import { Component } from '@angular/core';
import { MovementsService } from 'src/app/core/services/movements.service';
import { Movement } from 'src/app/core/models/movement.model';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent {
  query = '';
  movement: Movement | null = null;
  searched = false;
  arrivalInput: string | null = null; // input type="date" restituisce stringa

  constructor(private movService: MovementsService) {}

  search(): void {
    this.movement = this.movService.getMovementByBook(this.query);
    this.searched = true;
  }

  setArrival(): void {
    if (!this.movement || !this.arrivalInput) return;

    const arrivalDate = new Date(this.arrivalInput);

    this.movement.status = 'Arrivato';

    if (!this.movement.history) {
      this.movement.history = [];
    }

    this.movement.history.push({
      date: arrivalDate,
      description: 'Arrivato manualmente'
    });

    this.arrivalInput = null;
  }
}
