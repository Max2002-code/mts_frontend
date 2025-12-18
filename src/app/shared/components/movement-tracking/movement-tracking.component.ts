import { Component, OnInit } from '@angular/core';
import { MovementsService } from 'src/app/core/services/movements.service';
import { Movement } from 'src/app/core/models/movement.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent implements OnInit {
  query = '';
  movement: Movement | null = null;
  searched = false;
  arrivalInput: string | null = null; // input type="date" restituisce stringa

  constructor(
    private movService: MovementsService,
    private route: ActivatedRoute // <-- per leggere il parametro
  ) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const title = params.get('title');
    if (title) {
      this.query = title;
      this.search();
    }
  });
}


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
