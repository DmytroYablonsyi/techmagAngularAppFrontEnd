import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import type { Order } from './orders.module';
import { signal } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders = signal<Order[]>([]);

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders.set(data.reverse());
    });
  };

  getOrderDetails(orderId: string | undefined): void {
    this.router.navigate([`/order/${orderId}`]);
  }
}
