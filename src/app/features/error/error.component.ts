import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(private rouer:Router) { }

  goBack() {
    window.history.back();
  }

  goToHome(){
    this.rouer.navigate(['/home'])
  }

}
