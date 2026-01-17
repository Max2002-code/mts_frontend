import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private storageKey = 'myBooks';

  constructor() {}

  /** Salva libri senza cancellare quelli già presenti */
  saveBooks(books: any[]): Observable<any[]> {
    const existingBooks = this.getBooks();
    const allBooks = [...existingBooks, ...books];
    localStorage.setItem(this.storageKey, JSON.stringify(allBooks));
    console.log('Libri salvati nel localStorage:', allBooks);
    return of(allBooks);
  }

  /** Recupera tutti i libri */
  getBooks(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  /** Scarica i libri come file JSON */
  downloadBooksJson(filename: string = 'books.json'): void {
    const books = this.getBooks();
    const blob = new Blob([JSON.stringify(books, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /** Cancella tutti i libri */
  clearBooks(): void {
    localStorage.removeItem(this.storageKey);
  }
}
