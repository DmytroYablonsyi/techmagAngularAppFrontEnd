import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.module';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/api/products';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    const headers = this.authService.getAuthHeaders();
      return this.http.get<Product[]>(this.apiUrl, {headers});
    }

  getProductById(id: string): Observable<Product> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {headers} )
  }
  
  createProduct(product: Product): Observable<Product> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Product>(this.apiUrl,product, {headers});
  }
}
