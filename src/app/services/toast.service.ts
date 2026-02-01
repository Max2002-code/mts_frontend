import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new Subject<any>
  toast$ = this.toastSubject.asObservable()

  success(message:string){
    this.toastSubject.next({ type: 'success', message })
  }

  error(message:string){
    this.toastSubject.next({ type: 'error', message })
  }
}
