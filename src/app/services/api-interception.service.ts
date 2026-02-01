import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { AppState } from '../app.module';
import { Store } from '@ngrx/store';
import { getToken } from '../store/selector/login.selector';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptionService implements HttpInterceptor, OnDestroy{

  private ngDestroy$ = new Subject<void>
  private token: string | null = null

  constructor(private router:Router, private store: Store<AppState>, private authService:AuthService) {
    this.store.select(getToken).pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(token => {
      this.token = token
      if (token){
        localStorage.setItem('token', token)
      }
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const route = this.router.url.split('?')[0]

    const authToken = this.token || localStorage.getItem('token')

    if (authToken && route !== 'ticketconfirm'){
      const cleanedToken = authToken.replace(/"/g, '')
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${cleanedToken}`
        }
      })
    }

    return next.handle(req).pipe(
      catchError(err => {
        if(err.status  === 401 && authToken){
          this.authService.logout()
        }
        return throwError(() => err)
      })
    )
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next()
    this.ngDestroy$.complete()
  }
}
