import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
    const currentUser = this.authService.currentUserValue
    if (currentUser){
      return true
    }

    this.authService.logout()
    return false
  }
}
