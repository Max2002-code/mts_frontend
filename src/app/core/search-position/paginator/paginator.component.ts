import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() currentPage: number=1
  @Input() totalPages:number = 1
  @Input() totalItems:number = 0
  @Input() pageSize:number = 20

  @Output() pageChange = new EventEmitter<number>()

  inputPage:number = 1

  ngOnChanges() {
    this.inputPage = this.currentPage;
  }

  submitPage(){
    if(this.inputPage < 1) this.inputPage = 1

    if(this.inputPage > this.totalPages) this.inputPage = this.totalPages

    this.pageChange.emit(this.inputPage)
  }

  next(){
    this.pageChange.emit(Number(this.currentPage) + 1)
  }

  prev(){
    this.pageChange.emit(Number(this.currentPage) - 1)
  }

}
