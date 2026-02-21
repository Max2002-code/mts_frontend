import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { ToastService } from 'src/app/services/toast.service';

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

  pages = {
    magazzino:1,
    order:1,
    out:1,
  }

  constructor(private authService:AuthService, private http:ReportService, private toast:ToastService) {}

  datatablePage(pageInfo: {count?: number, pageSize?:number, limit?:number, offset?:number}, row_type:any, key: 'magazzino'|'order'|'out'){
    const page = (pageInfo.offset ?? 0) + 1;
    //row_type = {page:this.inputPage, per_page:row_type.per_page, results:[], total:row_type.total, pages:row_type.pages}
    this.pages[key] = page

    this.getClientBooks();
  }

  onFooterPageChange(page:number, rows_type:any, key:'magazzino'|'order'|'out'){
    const totalPages = Math.ceil((rows_type.total ?? 0) / rows_type.per_page);


    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const pageInfo = {
      offset: page - 1,
      pageSize: rows_type.per_page,
      limit: rows_type.per_page,
      count: rows_type.total
    };

    this.datatablePage(pageInfo, rows_type, key);

  }

  getClientBooks(){
    let data = this.search

    this.http.postClientBooksList(data, this.pages.magazzino, this.pages.order, this.pages.out).subscribe(data => {
      this.rows_mag = data.magazzino
      this.rows_order = data.order
      this.rows_out = data.out
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    this.getClientBooks()
  }

  /* ==================== AZIONI ==================== */
  deliverBook(book: any, type_move:string): void {
    this.http.postNewOrderBook(book.id, type_move).subscribe({
      next: data => {
        if (data.success){
          this.getClientBooks()
        }
      }, error: err => {
        console.error(err)
        this.toast.error(err)
      }
    })
  }

  requestBookFromWarehouse(book:any, type_move:string): void {
    this.http.postNewOrderBook(book.id, type_move).subscribe({
      next: data => {
        if (data.success){
          this.getClientBooks()
        }
      }, error: err => {
        console.error(err)
        this.toast.error(err)
      }
    })
  }

  trackByTitle(index: number, book: UserBook): string {
    return book.title;
  }

}
