import { Component, OnInit } from '@angular/core';
import { Customer } from './customers.module';
import { CustomerService } from '../../services/customers.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers = signal<Customer[]>([]);

  constructor(
    private customersService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  };

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers.set(data.reverse());
    });
  }

  deleteCustomer(customerId: string | undefined): void {
    if (customerId && confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(customerId).subscribe(
        () => {
          this.loadCustomers(); 
        },
        (error) => {
          console.error('Error deleting customer', error);
        }
      );
    }
  }
  
}
