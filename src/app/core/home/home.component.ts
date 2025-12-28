import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToTracking(): void {
    this.router.navigate(['/search']); // si entra dal search e poi tracking libro
  }

  goToMovements(): void {
    this.router.navigate(['/movements']);
  }
}
