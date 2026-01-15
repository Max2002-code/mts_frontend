import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  currentUser: UserModel | undefined

  constructor(private rouer:Router, private authService:AuthService) { }

  goBack() {
    window.history.back();
  }

  goToHome(){
    if (this.currentUser?.company.name === 'Mts'){
      this.rouer.navigate(['/home'])
    } else {
      this.rouer.navigate(['/client'])
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()
  }

}
