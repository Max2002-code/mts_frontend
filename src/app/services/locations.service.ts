import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  // Aggiunta proprietà ownerId per distinguere i libri degli utenti
  private locations: Location[] = [
    { id: 1, sector: 'A', shelf: '1', level: '1', books: ['Harry Potter', 'Dune'], ownerId: 101 },
    { id: 2, sector: 'B', shelf: '2', level: '3', books: ['Il Signore degli Anelli'], ownerId: 102 },
    { id: 3, sector: 'C', shelf: '3', level: '2', books: ['Angular', 'TypeScript'], ownerId: 101 },
    { id: 4, sector: 'D', shelf: '4', level: '1', books: ['1984', 'Il Piccolo Principe'], ownerId: 103 }
  ];

  /**
   * Trova un libro specifico per un utente.
   */
  findBookForUser(title: string, userId: number): Location | null {
    const search = title.trim().toLowerCase();
    if (!search) return null;

    for (const loc of this.locations) {
      if (loc.ownerId === userId && loc.books.some(book => book.toLowerCase().includes(search))) {
        return loc;
      }
    }
    return null;
  }

  /**
   * Restituisce tutti i libri di un utente con posizione.
   */
  getBooksForUser(userId: number): { title: string; sector: string; shelf: string; level: string }[] {
    const userBooks: { title: string; sector: string; shelf: string; level: string }[] = [];
    this.locations.forEach(loc => {
      if (loc.ownerId === userId) {
        loc.books.forEach(book => {
          userBooks.push({ title: book, sector: loc.sector, shelf: loc.shelf, level: loc.level });
        });
      }
    });
    return userBooks;
  }

  /**
   * Restituisce tutte le location (senza filtro utente)
   */
  getAll(): Location[] {
    return this.locations;
  }

  /**
   * Restituisce una location per ID
   */
  getById(id: number): Location | undefined {
    return this.locations.find(l => l.id === id);
  }

  findBook(title: string): Location | null {
  // esempio default userId = 101
  return this.findBookForUser(title, 101);
}


}
