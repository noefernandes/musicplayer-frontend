import { NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  
  @Input()
  showModal!: boolean;

  @Input()
  title!: string;

  @Input()
  width!: string;

  @Input()
  height!: string;
}
