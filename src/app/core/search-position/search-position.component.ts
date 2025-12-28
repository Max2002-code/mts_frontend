import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent {

  query = '';
  result: Location | null = null;
  searched = false;

  // Autocomplete
  books: string[] = [
    'Harry Potter',
    'Il Signore degli Anelli',
    '1984',
    'Il Piccolo Principe'
  ];
  filteredBooks: string[] = [];

  recentSearches: string[] = [];

  // Libri suggeriti
  otherBooks = [
    { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 }
  ];

  constructor(
    private locationsService: LocationsService,
    private router: Router
  ) {}

  /* AUTOCOMPLETE */
  onQueryChange(value: string): void {
    this.filteredBooks = value
      ? this.books.filter(b =>
          b.toLowerCase().includes(value.toLowerCase())
        )
      : [];
  }

  onBookSelected(title: string): void {
    this.query = title;
    this.filteredBooks = [];
    this.search();
  }

  /* RICERCA */
  search(): void {
    this.searched = true;
    this.result = this.locationsService.findBook(this.query);

    if (this.result) {
      this.saveRecentSearch();
    }
  }

  /* NAVIGAZIONE */
  goToTracking(title: string): void {
    this.router.navigate(['/', title]);
  }

  private saveRecentSearch(): void {
    if (!this.recentSearches.includes(this.query)) {
      this.recentSearches.unshift(this.query);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }
}
