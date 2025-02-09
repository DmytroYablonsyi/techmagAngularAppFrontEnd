import { Component, OnInit } from '@angular/core';
import { Customer } from './customers.module';
import { CustomerService } from './customers.service';
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
    this.customersService.getCustomers().subscribe((data) => {
      this.customers.set(data.reverse());
    });
  };
}
