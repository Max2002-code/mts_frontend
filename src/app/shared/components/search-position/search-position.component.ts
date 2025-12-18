import { Component } from '@angular/core';
import { LocationsService } from 'src/app/core/services/locations.service';
import { Location } from 'src/app/core/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent {

  query = '';
  result: Location | null = null;
  searched = false;

  // Lista di altri libri
  otherBooks = [
    { title: 'Harry Potter', sector: 'A', shelf: 3, level: 2 },
    { title: 'Il Signore degli Anelli', sector: 'B', shelf: 1, level: 4 },
    { title: '1984', sector: 'C', shelf: 2, level: 1 },
    { title: 'Il Piccolo Principe', sector: 'A', shelf: 5, level: 1 }
  ];

  constructor(
    private locationsService: LocationsService,
    private router: Router
  ) {}

  search(): void {
    this.searched = true;
    this.result = this.locationsService.findBook(this.query);
  }

  // Metodo per selezionare un libro dalla lista
  selectBook(title: string): void {
    this.query = title;
    this.search();
  }

  // Vai al tracciamento del libro selezionato
  goToTracking(title: string): void {
    this.router.navigate(['/tracking', title]);
  }
}
