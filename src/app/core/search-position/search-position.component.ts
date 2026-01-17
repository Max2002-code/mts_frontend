import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent implements OnInit {
  @ViewChild('positionDialog') positionDialog!: TemplateRef<any>;
  @ViewChild('addBooksDialog') addBooksDialog!: TemplateRef<any>;

  // Ricerca libro
  query: string = '';
  result: any;
  searched: boolean = false;

  // Paginazione
  pageSize: number = 20;
  currentPage: number = 0;
  inputPage: number = 1;

  currentUser: UserModel | undefined;
  public rows = { page: 1, per_page: 4, results: [] as any, total: 0, pages: 0 };
  search: any = {};
  pergamenaVisible: boolean = false;

  // ===================== AGGIUNGI LIBRI =====================
  newBook: any = { name: '', scaffale: '', x: 1, y: 1, lato: 'destra', bancale: 1, company: '' };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private http: ReportService,
    private booksService: BooksService
  ) {}

  /* ==================== MODALE ==================== */
  openPositionDialog(): void {
    if (!this.result) return;
    this.dialog.open(this.positionDialog, { width: '400px', panelClass: 'modern-dialog' });
  }

  openAddBooksDialog(): void {
    this.newBook = { name: '', scaffale: '', x: 1, y: 1, lato: 'destra', bancale: 1, company: '' };
    this.dialog.open(this.addBooksDialog, { width: '600px', disableClose: true });
  }

  isBancaleFull(scaffale: string, bancale: number): boolean {
    const books = this.booksService.getBooks();
    const count = books.filter(b => b.scaffale === scaffale && b.bancale === bancale).length;
    const maxBancale = 5; // esempio max libri per bancale
    return count >= maxBancale;
  }

  closeDialog(): void { this.dialog.closeAll(); }

  openPergamena(book: any) {
    this.result = book;
    this.pergamenaVisible = true;
  }

  /* ==================== PAGINAZIONE ==================== */
  updateInputPage(): void { this.inputPage = this.currentPage + 1; }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateInputPage();
    }
  }

  datatablePage(pageInfo: { count?: number; pageSize?: number; limit?: number; offset?: number }) {
    this.inputPage = (pageInfo.offset ?? 0) + 1;
    this.rows = { page: this.inputPage, per_page: this.rows.per_page, results: [], total: this.rows.total, pages: this.rows.pages };
    this.getBooks();
  }

  onFooterPageChange(page: number) {
    const totalPages = Math.ceil((this.rows.total ?? 0) / this.rows.per_page);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    this.datatablePage({
      offset: page - 1,
      pageSize: this.rows.per_page,
      limit: this.rows.per_page,
      count: this.rows.total
    });
  }

  ngOnInit(): void {
  this.currentUser = this.authService.getUserFromLocalStorage();

  // Carica i libri salvati nel localStorage all'avvio
  const savedBooks = this.booksService.getBooks();
  console.log('Libri caricati da localStorage:', savedBooks);

  this.getBooks();
  this.updateInputPage();
}

saveBook(): void {
  if (this.isBancaleFull(this.newBook.scaffale, this.newBook.bancale)) {
    alert('Il bancale è pieno. Non è possibile aggiungere altri libri.');
    return;
  }

  // Salva il libro nel localStorage
  this.booksService.saveBooks([this.newBook]).subscribe(savedBooks => {
    console.log('Libro salvato e lista aggiornata:', savedBooks);
  });

  this.dialog.closeAll();
  this.getBooks();
}

getBooks() {
  // Carica libri dal backend
  this.http.postMainBooksList(this.search, this.inputPage).subscribe(data => {
    // Mantieni prima i libri del backend
    this.rows = data;

    // Aggiungi libri salvati in localStorage
    const savedBooks = this.booksService.getBooks();
    this.rows.results = [...this.rows.results, ...savedBooks];

    console.log('Lista finale libri (backend + localStorage):', this.rows.results);
  });
}

}
