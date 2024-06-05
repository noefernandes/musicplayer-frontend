import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logoPath: string;
  backIconPath: string;
  forwardIconPath: string;

  constructor() {
    this.logoPath = 'assets/logo.png';
    this.backIconPath = 'assets/back-arrow.svg';
    this.forwardIconPath = 'assets/forward-arrow.svg';
  }

  ngOnInit() {
  }
}
