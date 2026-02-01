import { Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/models/movement.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent implements OnInit {
  currentUser: UserModel | undefined
  showPage:boolean = false
  public rows = { page: 1, per_page: 4, results: [] as any, total: 0, pages: 0 };
  pageSize: number = 20;
  currentPage: number = 0;
  inputPage: number = 1;
  search: any = {};

  books: Movement[] = [];
  selectedBook: any
  book_moves:any

  constructor(private authService:AuthService, private http:ReportService, private router:Router) {}

  datatablePage(pageInfo: { count?: number; pageSize?: number; limit?: number; offset?: number }) {
    this.inputPage = (pageInfo.offset ?? 0) + 1;
    this.rows = { page: this.inputPage, per_page: this.rows.per_page, results: [], total: this.rows.total, pages: this.rows.pages };
    this.getMovements();
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

  getMovements(){
    this.http.postAllMovemnets(this.search, this.inputPage).subscribe(data => {
      this.rows = data
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    if (this.currentUser?.company?.name === 'Mts'){
      this.showPage = true
    } else {
      alert('NON SEI AUTORIZZATO AD ENTRARE I QUESTA PAGINA!')
      this.router.navigate(['/client'])
    }

    this.getMovements()
  }

  getSortedHistory(book:any) {
    this.selectedBook = book
    this.book_moves = this.selectedBook.movements
  }
}
