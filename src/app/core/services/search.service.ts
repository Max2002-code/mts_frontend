import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: Location[] = [
    {
      id: 1,
      sector: 'A',
      shelf: '3',
      level: '2',
      books: ['Angular']
    },
    {
      id: 2,
      sector: 'B',
      shelf: '1',
      level: '1',
      books: ['TypeScript']
    }
  ];

  findBook(query: string): Location | null {
    const search = query.trim().toLowerCase();
    if (!search) return null;

    return (
      this.locations.find(location =>
        location.books.some(book =>
          book.toLowerCase().includes(search)
        )
      ) || null
    );
  }
}
