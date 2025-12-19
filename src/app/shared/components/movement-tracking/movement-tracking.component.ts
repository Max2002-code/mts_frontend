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
  query: string = '';
  movement: Movement | null = null;
  searched: boolean = false;
  arrivalInput: string | null = null;

  // Filtri cronologia
  filterStatus: string = 'Tutti';
  filteredHistory: any[] = [];

  constructor(
    private movService: MovementsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Se c'è parametro nel percorso, cerca subito il libro
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.query = title;
        this.search();
      }
    });
  }

recentSearches: string[] = [];

search(): void {
  this.movement = this.movService.getMovementByBook(this.query);
  this.searched = true;

  // Aggiungi alla lista delle ricerche recenti senza duplicati
  if (this.query && !this.recentSearches.includes(this.query)) {
    this.recentSearches.unshift(this.query);
    if (this.recentSearches.length > 5) {
      this.recentSearches.pop(); // mantieni max 5 elementi
    }
  }
}


  applyFilter(): void {
    if (!this.movement) return;

    if (this.filterStatus === 'Tutti') {
      this.filteredHistory = this.movement.history ?? [];
    } else {
      this.filteredHistory = (this.movement.history ?? []).filter(
        h => h.description === this.filterStatus
      );
    }
  }

  onFilterChange(): void {
    this.applyFilter();
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
      description: 'Arrivato'
    });

    this.arrivalInput = null;

    // Aggiorna filtro dopo inserimento
    this.applyFilter();
  }

  
}
