import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.component.html',
  styleUrls: ['./notifica.component.scss']
})
export class NotificaComponent implements OnInit {
  currentuUser: UserModel | undefined
  notifiche: any[] = [];

  constructor(private authService:AuthService, private http:ReportService) { }

  ngOnInit(): void {
    this.currentuUser = this.authService.getUserFromLocalStorage()

    this.http.getNotifications(false).subscribe(data=>{
      this.notifiche = data['notifications']
    })
  }

  // Determina la classe dell’icona in base al tipo
  getIconClass(tipo: string): string {
    switch (tipo) {
      case 'accettato': return 'icon-success';
      case 'rifiutato': return 'icon-error';
      case 'info': return 'icon-info';
      default: return 'icon-default';
    }
  }

  // Segna la notifica come accettata
  accetta(notifica: any) {
    this.http.postNotificationResponse(notifica.id, true).subscribe(data => {
      this.notifiche = this.notifiche.map(n => n.id === data.id ? data:n)
    })
  }

  // Segna la notifica come rifiutata
  rifiuta(notifica: any) {
    this.http.postNotificationResponse(notifica.id, false).subscribe(data => {
      this.notifiche = this.notifiche.map(n => n.id === data.id ? data:n)
    })
  }
}
