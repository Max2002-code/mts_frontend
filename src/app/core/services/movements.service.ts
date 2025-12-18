import { Injectable } from '@angular/core';
import { Movement } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private movements: Movement[] = [
    {
      id: 1,
      bookTitle: 'Harry Potter',
      status: 'In Transito',
      history: [
        { date: new Date('2025-12-01'), description: 'Prelevato dal magazzino' },
        { date: new Date('2025-12-03'), description: 'In viaggio verso il cliente' }
      ]
    },
    {
      id: 2,
      bookTitle: 'Dune',
      status: 'Disponibile',
      history: [
        { date: new Date('2025-12-02'), description: 'In magazzino' }
      ]
    },
    {
      id: 3,
      bookTitle: 'Il Signore degli Anelli',
      status: 'In Prestito',
      history: [
        { date: new Date('2025-12-04'), description: 'Prestito a utente' }
      ]
    }
  ];

  getAll(): Movement[] {
    return this.movements;
  }

  getMovementByBook(title: string): Movement | null {
    const search = title.trim().toLowerCase();
    if (!search) return null;

    return this.movements.find(m => m.bookTitle.toLowerCase().includes(search)) || null;
  }
}
