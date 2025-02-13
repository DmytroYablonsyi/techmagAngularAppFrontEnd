import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/adminUsers';
  private _authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.clear();
    this._authStatus.next(false);
    this.router.navigate(['/login']);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {name, email, password }).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 400 && error.error.message === 'User already exists') {
          errorMessage = error.error.message;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    const decodedToken = this.decodeToken(token);
    localStorage.setItem('name', decodedToken.name);
    this._authStatus.next(true);
  }

  getUserName(): string | null {
    return localStorage.getItem('name'); 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders() {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  private decodeToken(token: string): any {
    return jwtDecode(token)
  }

  get authStatus() {
    return this._authStatus.asObservable();
  }
}