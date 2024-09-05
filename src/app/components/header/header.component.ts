import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	logoPath: string;
	backIconPath: string;
	forwardIconPath: string;

	authService = inject(AuthService)

	constructor() {
		this.logoPath = 'assets/logo.png';
		this.backIconPath = 'assets/back-arrow.svg';
		this.forwardIconPath = 'assets/forward-arrow.svg';
	}

	ngOnInit() {
	}

	logout() {
		this.authService.logout().subscribe(() => {
			window.location.reload();
		})
	}
}
