import { Injectable } from '@angular/core';
import {
  Movement,
  MovementEvent,
  MovementStatus
} from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  /* =======================
     DATI MOCK
  ======================= */
  public movements: Movement[] = [
    {
      bookTitle: 'Harry Potter',
      status: 'In Transito',
      history: [
        {
          date: new Date('2025-12-01'),
          description: 'Disponibile',
          note: 'In magazzino centrale'
        },
        {
          date: new Date('2025-12-03'),
          description: 'In Transito',
          note: 'Spedizione verso filiale'
        }
      ]
    },
    {
      bookTitle: 'Dune',
      status: 'Disponibile',
      history: [
        {
          date: new Date('2025-12-02'),
          description: 'Disponibile',
          note: 'Pronto per il prestito'
        }
      ]
    },
    {
      bookTitle: 'Il Signore degli Anelli',
      status: 'In Prestito',
      history: [
        {
          date: new Date('2024-10-01'),
          description: 'In Prestito',
          note: 'Prestato a utente #123'
        }
      ]
    }
  ];

  /* =======================
     GETTERS PUBBLICI
  ======================= */

  /** 🔹 Usato dalla dashboard stats */
  getMovements(): Movement[] {
    return this.movements;
  }

  /** 🔹 Ricerca libro */
  getMovementByBook(title: string): Movement | null {
    const search = title.trim().toLowerCase();
    if (!search) return null;

    return (
      this.movements.find(m =>
        m.bookTitle.toLowerCase().includes(search)
      ) ?? null
    );
  }

  /** 🔹 Utility (opzionale) */
  getFirstByStatus(status: MovementStatus): Movement | null {
    return this.movements.find(m => m.status === status) ?? null;
  }

  /* =======================
     MUTAZIONI (future-ready)
  ======================= */

  /** 🔹 Aggiunta evento (per futuro backend) */
  addEvent(bookTitle: string, event: MovementEvent): void {
    const movement = this.getMovementByBook(bookTitle);
    if (!movement) return;

    movement.history.push(event);
    movement.status = event.description;
  }
}
