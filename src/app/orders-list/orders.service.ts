import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewOrder, Order } from './orders.module';
import { AuthService } from '../auth/auth-user/auth.service';

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

  addOrder(order: NewOrder): Observable<NewOrder> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<NewOrder>(this.apiUrl, order, {headers});
  }
}
