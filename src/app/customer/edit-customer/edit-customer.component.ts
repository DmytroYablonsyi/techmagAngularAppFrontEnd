import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customers.service';
import { Customer } from '../customers/customers.module';

@Component({
  selector: 'app-customer-update',
  standalone: false,
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService, 
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    // Ініціалізуємо форму
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      contactPerson: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });

    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe(
        (customerData) => {
          this.customerForm.patchValue({
            name: customerData.name,
            contactPerson: customerData.contactPerson,
            city: customerData.address.city,
            street: customerData.address.street,
            phone: customerData.phone
          });
        },
        (error) => {
          console.error('Error fetching customer data', error);
        }
      );
    }
  }

  updateCustomer(): void {
    const updatedCustomer = this.customerForm.value;
    console.log(updatedCustomer)
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.customerService.updateCustomer(customerId, updatedCustomer).subscribe(
        (response) => {
          console.log('Customer updated successfully:', response);
          this.router.navigate(['/customers']);
        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
    }
  }
}
