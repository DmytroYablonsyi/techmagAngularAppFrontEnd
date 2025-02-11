import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../orders-list/orders.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrders(): Observable<Order[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Order[]>(this.apiUrl, {headers});
  }

  getOrderById(id: string): Observable<Order> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {headers})
  }

  addOrder(order: Order): Observable<Order> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Order>(this.apiUrl, order, {headers});
  }
}
