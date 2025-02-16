import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-update',
  standalone: false,
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService, 
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      deliveryAvailable: [false],
      deliveryMethods: this.fb.array([]),
    });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (productData) => {

          // Patch the form values with the fetched product data
          this.productForm.patchValue({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            deliveryAvailable: productData.delivery.available,
          });

           // Get the deliveryMethods form array and loop through the product's delivery methods and add each as a form group
          const deliveryMethods = this.productForm.get('deliveryMethods') as FormArray;
          productData.delivery.methods.forEach(method => {
            deliveryMethods.push(this.fb.group({
              method: [method.method, Validators.required],
              time: [method.time, Validators.required],
              price: [method.price, [Validators.required, Validators.min(0)]],
            }));
          });
        
        },
        (error) => {
          console.error('Error fetching product data', error);
        }
      );
    }
  }

    // Getter for deliveryMethods (to simplify accessing the FormArray)
    get deliveryMethods() {
      return (this.productForm.get('deliveryMethods') as FormArray);
    }

    // update product data
    updateProduct(): void {
      const updatedProduct = this.productForm.value;
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.productService.updateProduct(productId, updatedProduct).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    }
  }
