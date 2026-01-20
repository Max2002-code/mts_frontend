import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loginFailed: boolean = false;
  loginSubmit: boolean = false;
  showPassword: boolean = false;

  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private report: ReportService
  ) {}

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });

  get lf() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
  }

  onLogin() {
    this.loginSubmit = true;

    if (this.loginForm.invalid) {
      this.loginFailed = true;
      return;
    }

    this.loginFailed = false; // reset

    const sub = this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
    .pipe(first())
    .subscribe({
      next: (user: UserModel | undefined) => {
        if (user) {
          this.authService.setUserFromLocalStorage(user);
          if (user.company.name === 'Mts') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/client']);
          }
        } else {
          this.loginFailed = true; // credenziali errate
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginFailed = true;
      }
    });

    this.unsubscribe.push(sub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

}
