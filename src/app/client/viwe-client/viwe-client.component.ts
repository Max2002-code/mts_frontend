import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';

interface UserBook {
  title: string;
  status: 'in possesso' | 'richiesto' | 'consegnato';
}

export interface PaginatorRows<T>{
  page:number
  per_page:number
  results:T[]
  total:number
  pages:number
}

export function createRows<T>(perPage: number = 4): PaginatorRows<T> {
  return {
    page: 1,
    per_page: perPage,
    results: [],
    total: 0,
    pages: 0
  };
}


@Component({
  selector: 'app-viwe-client',
  templateUrl: './viwe-client.component.html',
  styleUrls: ['./viwe-client.component.scss']
})
export class ViweClientComponent implements OnInit {

  currentUser: UserModel | undefined
  //public rows = {page:1, per_page:4, results:[] as any,total:0, pages:0}
  public rows_mag:PaginatorRows<any>=createRows<any>()
  public rows_order:PaginatorRows<any>=createRows<any>()
  public rows_out:PaginatorRows<any>=createRows<any>()
  search:any={}
  inputPage: number = 1;

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

  constructor(private authService:AuthService, private http:ReportService) {}

  datatablePage(pageInfo: {count?: number, pageSize?:number, limit?:number, offset?:number}, row_type:any){
    this.inputPage = (pageInfo.offset ?? 0) + 1;
    row_type = {page:this.inputPage, per_page:row_type.per_page, results:[], total:row_type.total, pages:row_type.pages}

    this.getClientBooks();
  }

  onFooterPageChange(page:number, rows_type:any){
    const totalPages = Math.ceil((rows_type.total ?? 0) / rows_type.per_page);


    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const pageInfo = {
      offset: page - 1,
      pageSize: rows_type.per_page,
      limit: rows_type.per_page,
      count: rows_type.total
    };

    this.datatablePage(pageInfo, rows_type);

  }

  getClientBooks(){
    let data = this.search

    this.http.postClientBooksList(data, this.inputPage).subscribe(data => {
      this.rows_mag = data.magazzino
      this.rows_order = data.order
      this.rows_out = data.out
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    this.getClientBooks()
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
  deliverBook(book: any, type_move:string): void {
    if (book.book_status !== 'ricevuto' && type_move !== 'ordinato'){
      return
    }

    this.http.postNewOrderBook(book.id, type_move).subscribe(data => {
      if (data.success){
        this.getClientBooks()
      }
    })
  }

  requestBookFromWarehouse(book:any, type_move:string): void {
    if (book.book_status !== 'magazzino' && type_move !== 'ordinato'){
      return
    }

    this.http.postNewOrderBook(book.id, type_move).subscribe(data => {
      if (data.success){
        this.getClientBooks()
      }
    })
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

settingsOpen: boolean = false;

toggleSettings(): void {
  this.settingsOpen = !this.settingsOpen;
}

closeSettings(): void {
  this.settingsOpen = false;
}

logout(): void {
  this.authService.logout(); // se esiste
  // oppure
  // localStorage.clear();
  // this.router.navigate(['/login']);
}

goToProfile(): void {
  console.log('Vai al profilo');
}

}
