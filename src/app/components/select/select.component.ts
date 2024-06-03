import { Component } from '@angular/core';

interface Option {
  image: string;
  name: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

}
