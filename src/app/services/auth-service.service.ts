import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../models/user";
import { Role } from "../models/role";

@Injectable({
  	providedIn: 'root'
})
export class AuthService {

  	private apiUrl = 'http://localhost:8080/api/v1/auth';
  	private http = inject(HttpClient);

	loadUser(): Observable<User> {
    	return this.getUser();
  	}
  
  	registerUser(fullname: string, email: string, password: string) : Observable<User> {
		return this.http.post<User>(`${this.apiUrl}/register`, {
			fullname,
			email, 
			password
		},{
			headers: {
				skipAuth: 'true'
			}
		});
  }

  	loginUser(email: string, password: string) : Observable<User> {
		return this.http.post<User>(`${this.apiUrl}/authenticate`, {
			email,
			password
		},
			{ withCredentials: true }
		);
  }

	refreshToken() : Observable<void> {
    	return this.http.post<void>(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true });
  	}

	getUser() : Observable<User> {
		return this.http.get<User>(`http://localhost:8080/api/v1/user`);
  	}

	logout() : Observable<void> {
		return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  	}
}