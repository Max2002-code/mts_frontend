import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './core/core.module';

// Componenti
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { FeaturesLayoutComponent } from './layout/features/features-layout/features-layout.component';
import { CoreLayoutComponent } from './layout/core/core-layout/core-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesLayoutComponent,
    CoreLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    CoreModule,
    FeaturesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

