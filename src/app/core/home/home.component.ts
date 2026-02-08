import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  currentUser: UserModel | undefined
  showPage:boolean = false

  book_in_magazine:number = 0
  book_export: number = 0
  scaffali: number = 0

  constructor(private router: Router, private authService:AuthService, private http:ReportService) {}

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToTracking(): void {
    this.router.navigate(['/search']); // si entra dal search e poi tracking libro
  }

  goToMovements(): void {
    this.router.navigate(['/movements']);
  }

  goToAdminUsers():void {
    this.router.navigate(['/admin-users'])
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    if (this.currentUser?.company?.name === 'Mts'){
      this.showPage = true
    } else {
      this.router.navigate(['/no-auth'])
    }

    this.http.getHomeStats().subscribe(data=>{
      this.book_in_magazine = data['book_in_magazine']
      this.book_export = data['book_export']
      this.scaffali = data['scaffali']
    })
  }
}
