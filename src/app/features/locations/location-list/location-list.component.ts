import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/core/services/locations.service';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  displayedColumns: string[] = ['position', 'books', 'actions'];

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    this.locations = this.locationsService.getAll();
  }
}
