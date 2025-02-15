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

  private getHeaders() {
    return this.authService.getAuthHeaders();
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer, { headers: this.getHeaders() });
  }

  updateCustomer(id: string, customerData: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customerData, { headers: this.getHeaders() });
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerId}`, { headers: this.getHeaders() });
  }
}
