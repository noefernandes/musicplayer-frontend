import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, NgClass],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	logoPath: string;
	backIconPath: string;
	forwardIconPath: string;

	authService = inject(AuthService)

	dropdownOpen: boolean = false;

	constructor() {
		this.logoPath = 'assets/logo.png';
		this.backIconPath = 'assets/back-arrow.svg';
		this.forwardIconPath = 'assets/forward-arrow.svg';
	}

	ngOnInit() {
	}

	toggleDropdown($event: Event): void {
		$event.stopPropagation();
		this.dropdownOpen = !this.dropdownOpen;
	}

	logout() {
		this.authService.logout().subscribe(() => {
			window.location.reload();
		})
	}

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const clickedInside = target.closest('relative');
		if(!clickedInside) {
			this.dropdownOpen = false;
		}
	}
}
