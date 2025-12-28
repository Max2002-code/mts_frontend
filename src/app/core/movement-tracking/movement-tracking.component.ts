import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovementsService } from 'src/app/services/movements.service';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent implements OnInit {

  query = '';
  searched = false;

  movement: Movement | null = null;
  arrivalInput: string | null = null;

  // Autocomplete
  books: string[] = [
    'Harry Potter',
    'Il Piccolo Principe',
    '1984',
    'Il Signore degli Anelli',
    'Cronache di Narnia'
  ];
  filteredBooks: string[] = [];

  // Filtri
  filterStatus = 'Tutti';
  filteredHistory: any[] = [];

  recentSearches: string[] = [];

  constructor(
    private movService: MovementsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.onBookSelected(title);
      }
    });
  }

  /* AUTOCOMPLETE */
  onQueryChange(value: string): void {
    this.filteredBooks = value
      ? this.books.filter(b =>
          b.toLowerCase().includes(value.toLowerCase())
        )
      : [];
  }

  onBookSelected(book: string): void {
    this.query = book;
    this.filteredBooks = [];
    this.search();
  }

  /* RICERCA */
  search(): void {
    this.searched = true;
    this.movement = this.movService.getMovementByBook(this.query);

    if (this.movement) {
      this.filteredHistory = this.movement.history ?? [];
      this.saveRecentSearch();
    }
  }

  /* FILTRI */
  onFilterChange(): void {
    if (!this.movement) return;

    this.filteredHistory =
      this.filterStatus === 'Tutti'
        ? this.movement.history ?? []
        : (this.movement.history ?? []).filter(
            h => h.description === this.filterStatus
          );
  }

  /* AZIONI */
  setArrival(): void {
    if (!this.movement || !this.arrivalInput) return;

    this.movement.status = 'Arrivato';
    this.movement.history ??= [];

    this.movement.history.push({
      date: new Date(this.arrivalInput),
      description: 'Arrivato'
    });

    this.arrivalInput = null;
    this.onFilterChange();
  }

  private saveRecentSearch(): void {
    if (!this.recentSearches.includes(this.query)) {
      this.recentSearches.unshift(this.query);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }
}
