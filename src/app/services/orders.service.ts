import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../order/orders-list/orders.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return this.authService.getAuthHeaders();
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, { headers: this.getHeaders() });
  }
}
