import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth-service.service';
import { catchError, map, of, Subscription, switchMap, take } from 'rxjs';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
  	const authService = inject(AuthService);
	const expectedRoles: Role[] = route.data['expectedRoles'];

	return authService.getUser().pipe(
		map((user: User | null) => {
			if (user) {
				const hasRoles = expectedRoles.some(role => user.role === role);
				if (hasRoles) {
					return true;
				} 
				
				router.navigate(['home']);
				return false;
				
			}
			
			router.navigate(['login']);
			return false;
		}),
		catchError((err: HttpErrorResponse) => {
			if (err.status === 401) {
				router.navigate(['login']);
			}
			return of(false);
		})
	)
};
