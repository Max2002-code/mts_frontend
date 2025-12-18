import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


// Componenti
import { AppComponent } from './app.component';
import { LocationListComponent } from './features/locations/location-list/location-list.component';
import { MovementFormComponent } from './features/movements/movement-form/movement-form.component';

// Moduli feature
import { SearchModule } from './features/search/search.module';
import { MovementsModule } from './features/movements/movements.module';
import { LocationsModule } from './features/locations/locations.module';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
    // non mettere LocationListComponent o MovementFormComponent qui
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule, 
    MatSelectModule,
    LocationsModule,
    SearchModule,
    MovementsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

