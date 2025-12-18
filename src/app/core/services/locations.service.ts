import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [
    { id: 1, sector: 'A', shelf: '1', level: '1', books: ['Harry Potter', 'Dune'] },
    { id: 2, sector: 'B', shelf: '2', level: '3', books: ['Il Signore degli Anelli'] },
    { id: 3, sector: 'C', shelf: '3', level: '2', books: ['Angular', 'TypeScript'] }
  ];

  findBook(title: string): Location | null {
    const search = title.trim().toLowerCase();
    if (!search) return null;

    for (const loc of this.locations) {
      if (loc.books.some(book => book.toLowerCase().includes(search))) {
        return loc;
      }
    }
    return null;
  }

  getAll(): Location[] {
    return this.locations;
  }

  getById(id: number): Location | undefined {
    return this.locations.find(l => l.id === id);
  }
}
