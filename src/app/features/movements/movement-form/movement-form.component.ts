import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/core/services/locations.service';
import { MovementsService } from 'src/app/core/services/movements.service';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent implements OnInit {
  locations: Location[] = [];
  bookTitle: string = '';
  fromLocation: number | null = null;
  toLocation: number | null = null;

  constructor(
    private locationsService: LocationsService,
    private movementsService: MovementsService
  ) {}

ngOnInit(): void {
  this.locations = this.locationsService.getAll();
}



  moveBook(): void {
    if (this.bookTitle && this.fromLocation !== null && this.toLocation !== null) {
      console.log('Movimento fittizio registrato.');
      alert('Libro spostato con successo!');
      this.bookTitle = '';
      this.fromLocation = null;
      this.toLocation = null;
    } else {
      alert('Compila tutti i campi!');
    }
  }
}
