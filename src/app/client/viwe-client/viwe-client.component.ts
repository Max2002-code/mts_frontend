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

  // Liste filtrate (per ricerca)
  filteredUserBooks: UserBook[] = [];
  filteredAvailableBooks: string[] = [];

  // Search
  searchTerm: string = '';

  /* ==================== PAGINAZIONE ==================== */

  userPageSize: number = 20;
  userCurrentPage: number = 0;

  availablePageSize: number = 20;
  availableCurrentPage: number = 0;

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.loadUserBooks();
    this.loadAvailableBooks();
    this.filterBooks();
  }

  /* ==================== CARICAMENTO DATI ==================== */

  loadUserBooks(): void {
    const myBooks = [
      'Harry Potter',
      '1984',
      'Angular'
    ]; // simulazione utente

    this.userBooks = myBooks.map(title => ({
      title,
      status: 'in possesso'
    }));

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

    this.availableBooks = Array.from(new Set(booksInWarehouse));
    this.filteredAvailableBooks = [...this.availableBooks];
  }

  /* ==================== SEARCH ==================== */

  filterBooks(): void {
    const search = this.searchTerm.toLowerCase().trim();

    this.filteredUserBooks = this.userBooks.filter(book =>
      book.title.toLowerCase().includes(search)
    );

    this.filteredAvailableBooks = this.availableBooks.filter(book =>
      book.toLowerCase().includes(search)
    );

    // reset pagine
    this.userCurrentPage = 0;
    this.availableCurrentPage = 0;
  }

  /* ==================== PAGINAZIONE - TUOI LIBRI ==================== */

  get pagedUserBooks(): UserBook[] {
    const start = this.userCurrentPage * this.userPageSize;
    return this.filteredUserBooks.slice(start, start + this.userPageSize);
  }

  userTotalPages(): number {
    return Math.ceil(this.filteredUserBooks.length / this.userPageSize);
  }

  userNextPage(): void {
    if (this.userCurrentPage < this.userTotalPages() - 1) {
      this.userCurrentPage++;
    }
  }

  userPrevPage(): void {
    if (this.userCurrentPage > 0) {
      this.userCurrentPage--;
    }
  }

  userGoToPage(page: number): void {
    if (page >= 1 && page <= this.userTotalPages()) {
      this.userCurrentPage = page - 1;
    }
  }

  /* ==================== PAGINAZIONE - MAGAZZINO ==================== */

  get pagedAvailableBooks(): string[] {
    const start = this.availableCurrentPage * this.availablePageSize;
    return this.filteredAvailableBooks.slice(start, start + this.availablePageSize);
  }

  availableTotalPages(): number {
    return Math.ceil(this.filteredAvailableBooks.length / this.availablePageSize);
  }

  availableNextPage(): void {
    if (this.availableCurrentPage < this.availableTotalPages() - 1) {
      this.availableCurrentPage++;
    }
  }

  availablePrevPage(): void {
    if (this.availableCurrentPage > 0) {
      this.availableCurrentPage--;
    }
  }

  availableGoToPage(page: number): void {
    if (page >= 1 && page <= this.availableTotalPages()) {
      this.availableCurrentPage = page - 1;
    }
  }

  /* ==================== AZIONI ==================== */

  deliverBook(book: UserBook): void {
    if (book.status === 'in possesso') {
      book.status = 'consegnato';
      alert(`Hai consegnato il libro "${book.title}"`);
      this.loadAvailableBooks();
      this.filterBooks();
    }
  }

  requestBookFromWarehouse(title: string): void {
    if (!this.userBooks.some(b => b.title === title)) {
      alert(`Hai richiesto il libro "${title}"`);
      this.availableBooks = this.availableBooks.filter(b => b !== title);
      this.userBooks.push({ title, status: 'richiesto' });
      this.filterBooks();
    }
  }
}
