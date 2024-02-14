import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unknown-error-page',
  templateUrl: './unknown-error-page.component.html',
  styleUrl: './unknown-error-page.component.css'
})
export class UnknownErrorPageComponent {

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['initiate-report-processing']);
  }
}
