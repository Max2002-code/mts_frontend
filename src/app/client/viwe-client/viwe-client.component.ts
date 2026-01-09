import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from 'src/app/models/location.model';

interface UserBook {
  title: string;
  status: 'in possesso' | 'richiesto' | 'consegnato';
}

@Component({
  selector: 'app-viwe-client',
  templateUrl: './viwe-client.component.html',
  styleUrls: ['./viwe-client.component.scss']
})
export class ViweClientComponent implements OnInit {

  /* ==================== DATI ==================== */
  userBooks: UserBook[] = [];
  availableBooks: string[] = [];

  filteredUserBooks: UserBook[] = [];
  filteredAvailableBooks: string[] = [];

  searchTerm: string = '';

  /* ==================== PAGINAZIONE ==================== */
  userPageSize: number = 4;
  userCurrentPage: number = 0;
  userPageInput: number = 1;

  availablePageSize: number = 4;
  availableCurrentPage: number = 0;
  availablePageInput: number = 1;

  requestedPageSize: number = 4;
  requestedCurrentPage: number = 0;
  requestedPageInput: number = 1;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.loadUserBooks();
    this.loadAvailableBooks();
    this.filterBooks();
  }

  /* ==================== CARICAMENTO DATI ==================== */
  loadUserBooks(): void {
    const myBooks = [
      'Harry Potter', '1984', 'Angular', 'Clean Code',
      'Design Patterns', 'Il Signore degli Anelli',
      'Dune', 'Neuromancer'
    ];

    this.userBooks = myBooks.map(title => ({ title, status: 'in possesso' }));
    this.filteredUserBooks = [...this.userBooks];
  }

  loadAvailableBooks(): void {
    const allLocations: Location[] = this.locationsService.getAll();
    const booksInWarehouse: string[] = [];

    allLocations.forEach(loc => {
      loc.books.forEach(book => {
        if (!this.userBooks.some(ub => ub.title === book)) {
          booksInWarehouse.push(book);
        }
      });
    });

    // Aggiungiamo altri libri random
    const extraBooks = [
      'Foundation', 'The Hobbit', 'The Witcher', 'Brave New World',
      'Fahrenheit 451', 'The Pragmatic Programmer', 'Refactoring',
      'Clean Architecture'
    ];

    this.availableBooks = Array.from(new Set([...booksInWarehouse, ...extraBooks]));
    this.filteredAvailableBooks = [...this.availableBooks];
  }

  /* ==================== SEARCH ==================== */
  filterBooks(): void {
    const search = this.searchTerm.toLowerCase().trim();

    this.filteredUserBooks = this.userBooks
      .filter(book => book.status !== 'richiesto')
      .filter(book => book.title.toLowerCase().includes(search));

    this.filteredAvailableBooks = this.availableBooks
      .filter(book => book.toLowerCase().includes(search));

    this.userCurrentPage = 0;
    this.availableCurrentPage = 0;
    this.requestedCurrentPage = 0;

    this.updatePageInputs();
  }

  /* ==================== AGGIORNA INPUT PAGINA ==================== */
  updatePageInputs(): void {
    this.userPageInput = this.userCurrentPage + 1;
    this.availablePageInput = this.availableCurrentPage + 1;
    this.requestedPageInput = this.requestedCurrentPage + 1;
  }

  /* ==================== TUOI LIBRI ==================== */
  get pagedUserBooks(): UserBook[] {
    const start = this.userCurrentPage * this.userPageSize;
    return this.filteredUserBooks.slice(start, start + this.userPageSize);
  }

  get userTotalPages(): number {
    return Math.max(Math.ceil(this.filteredUserBooks.length / this.userPageSize), 1);
  }

  userNextPage(): void {
    if (this.userCurrentPage < this.userTotalPages - 1) {
      this.userCurrentPage++;
      this.userPageInput = this.userCurrentPage + 1;
    }
  }

  userPrevPage(): void {
    if (this.userCurrentPage > 0) {
      this.userCurrentPage--;
      this.userPageInput = this.userCurrentPage + 1;
    }
  }

  setUserPage(): void {
    const page = this.userPageInput - 1;
    if (page >= 0 && page < this.userTotalPages) {
      this.userCurrentPage = page;
    } else {
      this.userPageInput = this.userCurrentPage + 1;
    }
  }

  /* ==================== MAGAZZINO ==================== */
  get pagedAvailableBooks(): string[] {
    const start = this.availableCurrentPage * this.availablePageSize;
    return this.filteredAvailableBooks.slice(start, start + this.availablePageSize);
  }

  get availableTotalPages(): number {
    return Math.max(Math.ceil(this.filteredAvailableBooks.length / this.availablePageSize), 1);
  }

  availableNextPage(): void {
    if (this.availableCurrentPage < this.availableTotalPages - 1) {
      this.availableCurrentPage++;
      this.availablePageInput = this.availableCurrentPage + 1;
    }
  }

  availablePrevPage(): void {
    if (this.availableCurrentPage > 0) {
      this.availableCurrentPage--;
      this.availablePageInput = this.availableCurrentPage + 1;
    }
  }

  setAvailablePage(): void {
    const page = this.availablePageInput - 1;
    if (page >= 0 && page < this.availableTotalPages) {
      this.availableCurrentPage = page;
    } else {
      this.availablePageInput = this.availableCurrentPage + 1;
    }
  }

  /* ==================== AZIONI ==================== */
  deliverBook(book: UserBook): void {
    if (book.status === 'in possesso') {
      book.status = 'consegnato';
      this.loadAvailableBooks();
      this.filterBooks();
    }
  }

  requestBookFromWarehouse(title: string): void {
    if (!this.userBooks.some(b => b.title === title)) {
      this.userBooks.push({ title, status: 'richiesto' });
      this.requestedCurrentPage = 0;
      this.availableBooks = this.availableBooks.filter(b => b !== title);
      this.filterBooks();
    }
  }

  /* ==================== DASHBOARD RICHIESTE ==================== */
  get requestedBooks(): UserBook[] {
    return this.userBooks.filter(b => b.status === 'richiesto');
  }

  get pagedRequestedBooks(): UserBook[] {
    const start = this.requestedCurrentPage * this.requestedPageSize;
    return this.requestedBooks.slice(start, start + this.requestedPageSize);
  }

  get requestedTotalPages(): number {
    return Math.max(Math.ceil(this.requestedBooks.length / this.requestedPageSize), 1);
  }

  requestedNextPage(): void {
    if (this.requestedCurrentPage < this.requestedTotalPages - 1) {
      this.requestedCurrentPage++;
      this.requestedPageInput = this.requestedCurrentPage + 1;
    }
  }

  requestedPrevPage(): void {
    if (this.requestedCurrentPage > 0) {
      this.requestedCurrentPage--;
      this.requestedPageInput = this.requestedCurrentPage + 1;
    }
  }

  setRequestedPage(): void {
    const page = this.requestedPageInput - 1;
    if (page >= 0 && page < this.requestedTotalPages) {
      this.requestedCurrentPage = page;
    } else {
      this.requestedPageInput = this.requestedCurrentPage + 1;
    }
  }

  trackByTitle(index: number, book: UserBook): string {
    return book.title;
  }
}
