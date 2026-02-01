import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss']
})
export class ChangePwComponent implements OnInit{
  currentUser: UserModel | undefined
  new_password: string = ''
  confirm_password: string = ''
  showPassword:boolean = false

  constructor(private http:ReportService, private auth:AuthService, private router:Router) { }

  toggle_password(id:string) {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if(input){
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  reset_password(new_password: string, confirm_password: string){
    if (new_password.length == 0 || confirm_password.length == 0){
      alert("Compila tutti i campi")
      return
    }

    if (new_password !== confirm_password){
      alert("Le nuove password non coincidono")
      return
    }

    if (new_password === confirm_password){
      this.http.postChangePassword(new_password).subscribe({
        next: (res:any) => {
          alert("Password cambiata con successo")
          if (this.currentUser?.company?.name === 'Mts'){
            this.router.navigate(['/home'])
          } else {
            this.router.navigate(['/client'])
          }
        }, error: (err:any) => {
          alert("Errore nel cambiare la password: " + err.error.error)
        }
      })
    }
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUserFromLocalStorage()
    
  }

}