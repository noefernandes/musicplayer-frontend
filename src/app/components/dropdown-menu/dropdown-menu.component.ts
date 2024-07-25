import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ClickOutsideDirective],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})
export class DropdownMenuComponent {
  isOpen = false;

  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  toggleDropdown($event: Event) {
    $event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  clickedOutside(): void {
    this.isOpen = false;
  }

  edit() {
    this.editClicked.emit();
    this.isOpen = false;
  }

  delete($event: Event) {
    $event.stopPropagation();
    this.deleteClicked.emit();
    this.isOpen = false;
  }
}
