import { Component } from '@angular/core';
import type { Customer } from '../customers/customers.module';
import { CustomerService } from '../../services/customers.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-new-customers',
  standalone: false,
  templateUrl: './new-customers.component.html',
  styleUrl: './new-customers.component.css'
})
export class NewCustomerComponent {
  client = signal<Customer>({
    name: '',
    address: {
      city: '',
      street: ''
    },
    contactPerson: '',
    phone: '',
  });

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) {}

  createClient() {
    this.customerService.createCustomer(this.client()).subscribe(
      () => {
        this.router.navigate(['/customers']);
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    );
  }
}