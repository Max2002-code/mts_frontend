import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent implements OnInit {
    @ViewChild('positionDialog') positionDialog!: TemplateRef<any>;

  // Ricerca libro
  query: string = '';
  result:any
  searched: boolean = false;

  // Paginazione
  pageSize: number = 20;
  currentPage: number = 0;
  inputPage: number = 1; // per input editabile

  currentUser: UserModel | undefined
  public rows = {page:1, per_page:20, results:[] as any,total:0}
  search:any={}
  pergamenaVisible: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService:AuthService,
    private http:ReportService,
  ) {}

  /* ==================== RICERCA ==================== 
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
  }*/


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

  updateInputPage(): void {
    this.inputPage = this.currentPage + 1;
  }

  /*nextPage(): void {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateInputPage();
    }
  }*/

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateInputPage();
    }
  }

  /*goToInputPage(): void {
    if (this.inputPage >= 1 && this.inputPage <= this.totalPages()) {
      this.currentPage = this.inputPage - 1;
      this.updateInputPage();
    }
  }*/

  /* ==================== NAVIGAZIONE ==================== */
  goToTracking(title: string): void {
    this.router.navigate(['/', title]);
  }

  datatablePage(pageInfo: {count?: number, pageSize?:number, limit?:number, offset?:number}){
    this.inputPage = (pageInfo.offset ?? 0) + 1;
    this.rows = {page:this.inputPage, per_page:20, results:[], total:this.rows.total}

    this.getBooks();
  }

  getBooks(){
    let data = this.search

    this.http.postBooksList(data, this.inputPage).subscribe(data => {
      this.rows = data
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    this.getBooks()

    this.updateInputPage();

  }

}
