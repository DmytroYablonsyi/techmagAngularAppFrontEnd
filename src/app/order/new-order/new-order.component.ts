import { Component } from '@angular/core';
import type { Order } from '../orders-list/orders.module';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../product/product-list/product.module';
import { CustomerService } from '../../services/customers.service';
import { Customer } from '../../customer/customers/customers.module';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  standalone: false,
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent {
  customers = signal<Customer[]>([]);
  orders = signal<Order[]>([]); 
  product = signal<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    delivery: {
      available: false,
      methods: []
    }
  });

  customerName = signal<string>('');
  selectedProduct = signal<string>('');
  quantity = signal<number>(1);
  delivMethod = signal<string>('');
  deliveryTime = signal<string>('');
  deliveryPrice = signal<number>(0);
  amount = signal<number>(0);

  constructor(
      private customersService: CustomerService,
      private orderService: OrdersService,
      private productService: ProductsService,
      private route: ActivatedRoute,
      private router: Router
      
  ) {};

  ngOnInit(): void {
    this.getProductDetails(this.route.snapshot.paramMap.get('id')!); 
    this.customersService.getCustomers().subscribe((data) => {
      this.customers.set(data);
    });
  };

  getProductDetails(id: string): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product.set(data); 
      },
      (error: any) => {
        console.error('Error fetching order:', error); 
      }
    );
  };

  updateAmount(): void {
    this.amount.set(this.quantity() * this.product().price + this.deliveryPrice());
  };

  onCustomerNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerName.set(input.value); 
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.quantity.set(Number(input.value));
    this.updateAmount(); 
  }

  onDelivMethodChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.delivMethod.set(select.value); 
    this.updateDeliveryDetails();
  }

  updateDeliveryDetails(): void {
    const selectedMethod = this.product().delivery.methods.find(method => method.method === this.delivMethod());
  
    if (selectedMethod) {
      this.deliveryTime.set(selectedMethod.time);
      this.deliveryPrice.set(selectedMethod.price);
    } else {
      this.deliveryTime.set('');
      this.deliveryPrice.set(0);
    }
  }

  onSubmit(): void {
 
    if (this.customerName() && this.quantity() > 0 ) {
      
      const newOrder: Order = {
        customerName: this.customerName(),
        product: this.product().name,
        quantity: this.quantity(),
        amount: this.amount(),
        delivery: {
          method: this.delivMethod() || 'not available',
          time: this.deliveryTime() || '0',
          price: this.deliveryPrice() || 0,
        }
      };

      this.orderService.addOrder(newOrder).subscribe(
        (order) => {
          this.orders.update(orders => [...orders, order]);
          this.router.navigate(['orders'])
          this.resetForm();
        },
        (error) => {
          console.error(error); 
        }
      );
    } else {
      console.log('Форма не дійсна'); 
    }
  }
  resetForm(): void {
    this.customerName.set('');
    // this.selectedProduct.set('');
    this.quantity.set(1);
    this.delivMethod.set('');
    this.deliveryTime.set('');
    this.deliveryPrice.set(0);
    this.amount.set(0);
  }
};
