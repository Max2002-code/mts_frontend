import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private storageKey = 'myBooks';

  constructor() {}

  /** Salva libri senza cancellare quelli già presenti */
  saveBook(book: any) {
    const state = this.getState()

    const index = state.books.findIndex(b => b.tempId === book.tempId)

    if (index > -1){
      state.books[index] = book
    } else {
      state.books.push(book)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(state))
  }

  startWizard(targetCount:number){
    const state = {
      targetCount,
      books: []
    }
    localStorage.setItem(this.storageKey, JSON.stringify(state))
  }

  /** Recupera tutti i libri */
  getState(): {targetCount:number, books:any[]} {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {targetCount: 0, books:[]};
  }

  /** Cancella tutti i libri */
  clearBooks(): void {
    localStorage.removeItem(this.storageKey);
  }
}
