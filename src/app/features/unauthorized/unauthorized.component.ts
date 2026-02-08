import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit{
  currentUser: UserModel | undefined

  constructor(private router:Router, private auth:AuthService){ }

  goBack(){
    window.history.back()
  }

  goToHome(){
    if (this.currentUser?.company.name === 'Mts'){
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/client'])
    }
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUserFromLocalStorage()
  }

}
