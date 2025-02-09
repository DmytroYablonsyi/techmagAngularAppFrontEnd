import { Component } from '@angular/core';
import { Product } from './product.module';
import { ProductsService } from './products.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class HomeComponent {
  products = signal<Product[]>([]);

    constructor(private productServices: ProductsService) {}

    ngOnInit(): void {
      this.productServices.getProducts().subscribe((data) => {
        this.products.set(data);
      });
    }

    createProduct(newOrder: Product): void {
      this.productServices.createProduct(newOrder).subscribe((order) => {
        this.products.update(products => [...products, order]);
      });
    }
}
