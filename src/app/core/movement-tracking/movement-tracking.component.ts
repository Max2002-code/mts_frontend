import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovementsService } from 'src/app/services/movements.service';
import {
  Movement,
  MovementEvent,
  MovementStatus
} from 'src/app/models/movement.model';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent implements OnInit {

  /* =======================
     RICERCA
  ======================= */
  query = '';
  searched = false;

  movement: Movement | null = null;

  /* =======================
     AUTOCOMPLETE
  ======================= */
  books: string[] = [
    'Harry Potter',
    'Il Piccolo Principe',
    '1984',
    'Il Signore degli Anelli',
    'Cronache di Narnia'
  ];
  filteredBooks: string[] = [];

  recentSearches: string[] = [];

  /* =======================
     FILTRI / ORDINAMENTO
  ======================= */
  filterStatus: MovementStatus | 'Tutti' = 'Tutti';
  filteredHistory: MovementEvent[] = [];

  sortOrder: 'asc' | 'desc' = 'desc';
  historyQuery = '';

  /* =======================
     NUOVO EVENTO
  ======================= */
  newEventStatus: MovementStatus | null = null;
  newEventDate: string | null = null;
  newEventNote = '';

  /* =======================
     COSTRUTTORE
  ======================= */
  constructor(
    private movService: MovementsService,
    private route: ActivatedRoute
  ) {}

  /* =======================
     INIT
  ======================= */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      if (title) {
        this.onBookSelected(title);
      }
    });
  }

  /* =======================
     AUTOCOMPLETE
  ======================= */
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

  /* =======================
     RICERCA LIBRO
  ======================= */
  search(): void {
    this.searched = true;
    this.filterStatus = 'Tutti';
    this.historyQuery = '';

    this.movement = this.movService.getMovementByBook(this.query);

    if (this.movement) {
      this.movement.history ??= [];
      this.updateStatusFromHistory();
      this.applyFilters();
      this.saveRecentSearch();
    }
  }

  /* =======================
     EVENTI
  ======================= */
  addEvent(): void {
    if (!this.movement || !this.newEventStatus || !this.newEventDate) return;

    const last = this.movement.history.at(-1);

    // ❌ evita doppioni consecutivi
    if (last?.description === this.newEventStatus) return;

    this.movement.history.push({
      date: new Date(this.newEventDate),
      description: this.newEventStatus,
      note: this.newEventNote
    });

    this.updateStatusFromHistory();
    this.resetEventForm();
    this.applyFilters();
  }

  private resetEventForm(): void {
    this.newEventStatus = null;
    this.newEventDate = null;
    this.newEventNote = '';
  }

  /* =======================
     STATO AUTOMATICO
  ======================= */
  private updateStatusFromHistory(): void {
    if (!this.movement) return;

    // ordina per data ASC
    this.movement.history.sort(
      (a, b) => +new Date(a.date) - +new Date(b.date)
    );

    // reset stato corrente
    this.movement.history.forEach(h => (h.isCurrent = false));

    const last = this.movement.history.at(-1);
    if (!last) return;

    last.isCurrent = true;
    this.movement.status = last.description;
  }

  /* =======================
     FILTRI + ORDINAMENTO
  ======================= */
  applyFilters(): void {
    if (!this.movement) return;

    let history = [...this.movement.history];

    // filtro stato
    if (this.filterStatus !== 'Tutti') {
      history = history.filter(
        h => h.description === this.filterStatus
      );
    }

    // ricerca testo
    if (this.historyQuery) {
      const q = this.historyQuery.toLowerCase();
      history = history.filter(h =>
        h.description.toLowerCase().includes(q) ||
        h.note?.toLowerCase().includes(q)
      );
    }

    // ordinamento
    history.sort((a, b) =>
      this.sortOrder === 'asc'
        ? +new Date(a.date) - +new Date(b.date)
        : +new Date(b.date) - +new Date(a.date)
    );

    this.filteredHistory = history;
  }

  toggleSort(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  /* =======================
     ALERT PRESTITO LUNGO
  ======================= */
  isOverdue(): boolean {
    if (!this.movement) return false;

    const last = this.movement.history.at(-1);
    if (!last || last.description !== 'In Prestito') return false;

    const days =
      (Date.now() - +new Date(last.date)) / (1000 * 60 * 60 * 24);

    return days > 30;
  }

  /* =======================
     DASHBOARD STATS
  ======================= */
  get stats() {
    const movements = this.movService.movements;

    return {
      totale: movements.length,
      disponibili: movements.filter(m => m.status === 'Disponibile').length,
      prestito: movements.filter(m => m.status === 'In Prestito').length,
      transito: movements.filter(m => m.status === 'In Transito').length
    };
  }

  /* =======================
     UTILS
  ======================= */
  private saveRecentSearch(): void {
    if (!this.recentSearches.includes(this.query)) {
      this.recentSearches.unshift(this.query);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }
}
