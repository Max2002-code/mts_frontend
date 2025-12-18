import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../../core/services/locations.service';
import { Location } from 'src/app/core/models/location.model';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
})
export class LocationDetailComponent implements OnInit {
  location: Location | undefined;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.locationService.getById(id);
  }
}
