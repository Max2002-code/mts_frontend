import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Angular Services
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth/auth.service';
import { ApiInterceptionService } from './services/api-interception.service';
import { ReportService } from './services/report.service';
import { AuthGuardService } from './shared/auth/auth-guard.service';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './core/core.module';
import { MatDialogModule } from '@angular/material/dialog';

// Componenti
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { FeaturesLayoutComponent } from './layout/features/features-layout/features-layout.component';
import { CoreLayoutComponent } from './layout/core/core-layout/core-layout.component';
import { UserModel } from './models/user.model';
import { StoreModule } from '@ngrx/store';
import { ViweClientComponent } from './client/viwe-client/viwe-client.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ToastComponent } from './features/toast/toast.component';


export interface AppState {
  auth: any
  token: string | null
  user: UserModel | null
}

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    FeaturesLayoutComponent,
    CoreLayoutComponent,
    ViweClientComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    CoreModule,
    FeaturesModule,
    HttpClientModule,
    MatDialogModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptionService, multi: true },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    ReportService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

