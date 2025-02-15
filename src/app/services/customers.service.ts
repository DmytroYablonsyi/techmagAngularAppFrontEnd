import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customers/customers.module';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCustomers(): Observable<Customer[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Customer[]>(this.apiUrl, {headers});
  }

  getCustomerById(id: string): Observable<Customer> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Customer>(`${this.apiUrl}/${id}`, {headers})
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Customer>(this.apiUrl, customer, {headers});
  }
}
