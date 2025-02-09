import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders-list/orders.service';
import { Order } from '../orders-list/orders.module';
import { signal } from '@angular/core';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order = signal<Order | null>(null); 
  amount = signal<number>(0);
  totalAmount = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService 
  ) {}

  ngOnInit(): void {
    this.getOrderDetails(this.route.snapshot.paramMap.get('id')!);
  }

  getOrderDetails(id: string): void {
    this.orderService.getOrderById(id).subscribe(
      (data: Order) => {
        this.order.set(data); 
        this.amount.set(data.amount - data.delivery.price);
        this.totalAmount.set(data.delivery.price + (data.amount - data.delivery.price))
      },
      (error: any) => {
        console.error('Error fetching order:', error); 
      }
    );
  }
}
