import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockList } from 'net';
import { first, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginFailed: boolean = false
  loginSubmit: Boolean = false

  constructor(private router:Router, private authService:AuthService, private report:ReportService) { }

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  })
  private unsubscribe: Subscription[]=[]

  get lf(){
    return this.loginForm.controls
  }

  onLogin(){
    this.loginSubmit = true
    if (this.loginForm.invalid){
      return
    }

    this.loginFailed = false
    const loginSub = this.authService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe((user:UserModel | undefined)=>{
      if (user){
        this.authService.setUserFromLocalStorage(user)
        if (user.company.name === 'Mts') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/client'])
        }
      }
    })
    this.unsubscribe.push(loginSub)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe())
  }

}
