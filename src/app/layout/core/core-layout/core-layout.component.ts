import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.scss']
})
export class CoreLayoutComponent implements OnInit{
  currentUser: UserModel | undefined
  unread_count:number=0

  constructor(private authService:AuthService, private http:ReportService){}

  logout(){
    this.authService.logout()
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserFromLocalStorage()

    this.http.getNotifications(true).subscribe(data=>{
      this.unread_count = data['unread']
    })
  }

}
