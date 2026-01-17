import { Component, OnInit } from '@angular/core';
import { MovementsService } from 'src/app/services/movements.service';
import { Movement, MovementEvent } from 'src/app/models/movement.model';

@Component({
  selector: 'app-movement-tracking',
  templateUrl: './movement-tracking.component.html',
  styleUrls: ['./movement-tracking.component.scss']
})
export class MovementTrackingComponent implements OnInit {

  books: Movement[] = [];
  selectedBook: Movement | null = null;

  constructor(public movService: MovementsService) {}

  ngOnInit(): void {
    this.books = this.movService.movements;
  }

  getSortedHistory(book: Movement): MovementEvent[] {
    return [...(book.history ?? [])].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
  }
}
