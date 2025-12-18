import { Component } from '@angular/core';
import { LocationsService } from 'src/app/core/services/locations.service';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-search-position',
  templateUrl: './search-position.component.html',
  styleUrls: ['./search-position.component.scss']
})
export class SearchPositionComponent {

  query = '';
  result: Location | null = null;
  searched = false;

  constructor(private locationsService: LocationsService) {}

  search(): void {
    this.searched = true;
    this.result = this.locationsService.findBook(this.query);
  }
}
