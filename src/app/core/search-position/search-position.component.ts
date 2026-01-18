import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { BooksService } from '../../services/books.service';
import { NgForm } from '@angular/forms';
import { stat } from 'fs';

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
  add_book:boolean = false
  companies:any

  // ===================== AGGIUNGI LIBRI =====================
  currentBook: any = {};
  newBooks: any[] = [];
  currentIndex:number = 0
  step:number = 1
  showModal:boolean = false
  booksCount:number = 1

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private http: ReportService,
    private booksService: BooksService
  ) {}

  /* ==================== MODALE ==================== */

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

  open(){
    this.showModal = true
    this.step = 1
  }

  close(){
    this.showModal = false
    this.booksCount = 1
  }

  startBooks() {
    this.booksService.startWizard(this.booksCount)

    this.currentIndex = 0
    this.resetCurrentBook()
    this.step = 2
  }

  loadCurrentBook(){
    const state = this.booksService.getState()
    this.currentBook = state.books[this.currentIndex]
  }

  nextBook() {
    if (!this.isCurrentBookValid()) {
      return;
    }

    const state = this.booksService.getState()

    if (this.currentIndex >= state.targetCount) return

    this.booksService.saveBook(this.currentBook)

    this.currentIndex++
    this.resetCurrentBook()
  }

  resetCurrentBook(){
    this.currentBook = {
      tempId: crypto.randomUUID(),
      name: '',
      scaffale: '',
      bancale: '',
      x: null,
      y: null,
      lato: '',
      company: ''
    }
  }

  canGoNext(){
    return this.isCurrentBookValid();
  }

  prevBook() {
    this.saveCurrentBook();
    this.currentIndex--;
    this.loadCurrentBook();
  }

  saveCurrentBook() {
    if (!this.isCurrentBookValid()) return

    this.booksService.saveBook(this.currentBook)
  }

  saveBooks() {
    if (!this.isCurrentBookValid()) {
      return;
    }

    this.booksService.saveBook(this.currentBook)

    const state = this.booksService.getState()
    this.booksService.clearBooks()

    this.step = 3

    this.http.postNewBooks(state.books).subscribe(data => {
      this.close()
      this.getBooks()
    })
  }

  isCurrentBookValid(): boolean {
    const b = this.currentBook;

    if (!b) return false;

    const requiredFilled =
      b.name &&
      b.x !== null &&
      b.y !== null &&
      b.company &&
      b.lato;

    const hasLocation =
      (b.scaffale && b.scaffale.trim()) ||
      (b.bancale && b.bancale.trim());

    return !!(requiredFilled && hasLocation);
  }

  resumeBooks(state: {targetCount: number, books:any[]}){
    this.showModal = true
    this.step = 2

    this.booksCount = state.targetCount
    this.currentIndex = state.books.length

    this.resetCurrentBook()
  }

  getBooks() {
    this.http.postMainBooksList(this.search, this.inputPage).subscribe(data => {
      this.rows = data;
    });
  }

  getCompany(){
    this.http.getCompany().subscribe(data => {
      this.companies = data
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage();

    this.getBooks();
    this.getCompany()
    this.updateInputPage();

    const state = this.booksService.getState()
    
    if (state.books.length > 0 && state.books.length < state.targetCount) {
      this.resumeBooks(state);
    }
  }

}
