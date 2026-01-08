import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent implements OnInit {

  // Ricerca libro
  query: string = '';
  result: Location | null = null;
  searched: boolean = false;

  // Autocomplete
  books: string[] = ['Harry Potter', 'Il Signore degli Anelli', '1984', 'Il Piccolo Principe'];
  filteredBooks: string[] = [];
  recentSearches: string[] = [];

  // Libri suggeriti
  otherBooks = [
    { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
        { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 },
  ];

  // Paginazione
  pageSize: number = 20;
  currentPage: number = 0;
  inputPage: number = 1; // per input editabile

  @ViewChild('positionDialog') positionDialog!: TemplateRef<any>;

  constructor(
    private locationsService: LocationsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateInputPage();
  }

  /* ==================== AUTOCOMPLETE ==================== */
  onQueryChange(value: string): void {
    this.filteredBooks = value
      ? this.books.filter(b => b.toLowerCase().includes(value.toLowerCase()))
      : [];
  }

  onBookSelected(title: string): void {
    this.query = title;
    this.filteredBooks = [];
    this.search();
  }

  /* ==================== RICERCA ==================== */
search(): void {
  this.searched = true;
  this.result = this.locationsService.findBook(this.query);

  if (!this.result) {
    alert('Libro non trovato!');
    return;
  }

  this.saveRecentSearch();
  this.dialog.open(this.positionDialog, {
    width: '400px',
    panelClass: 'modern-dialog'
  });
}


  /* ==================== MODALE ==================== */
  openPositionDialog(): void {
    if (!this.result) return;

    this.dialog.open(this.positionDialog, {
      width: '400px',
      panelClass: 'modern-dialog'
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  openPergamena(book: any) {
    this.result = book;
    this.pergamenaVisible = true;
}


  /* ==================== PAGINAZIONE ==================== */
  get pagedBooks() {
    const start = this.currentPage * this.pageSize;
    return this.otherBooks.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.otherBooks.length / this.pageSize);
  }

  updateInputPage(): void {
    this.inputPage = this.currentPage + 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateInputPage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateInputPage();
    }
  }

  goToInputPage(): void {
    if (this.inputPage >= 1 && this.inputPage <= this.totalPages()) {
      this.currentPage = this.inputPage - 1;
      this.updateInputPage();
    }
  }

  /* ==================== NAVIGAZIONE ==================== */
  goToTracking(title: string): void {
    this.router.navigate(['/', title]);
  }

  /* ==================== UTILI ==================== */
  private saveRecentSearch(): void {
    if (!this.recentSearches.includes(this.query)) {
      this.recentSearches.unshift(this.query);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }

  pergamenaVisible: boolean = false;

showPergamena() {
  this.pergamenaVisible = true;
}

closePergamena() {
  this.pergamenaVisible = false;
}

}
