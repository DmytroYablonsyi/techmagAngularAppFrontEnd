import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product-list/product.module';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/api/products';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return this.authService.getAuthHeaders();
  }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl, { headers: this.getHeaders() });
    }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() } )
  }
  
  updateProduct(id: string, productData: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData, { headers: this.getHeaders()})
  }
}
