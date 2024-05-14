import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Product from '../types/product';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  httpClient = inject(HttpClient)

  getProducts() {
    return this.httpClient.get<Product[]>(environment.apiUrl + '/products');
  }

  addProduct(product: Product) {
    return this.httpClient.post<Product>(environment.apiUrl + '/products', product);
  }

  getProduct(id: string) {
    return this.httpClient.get<Product>(environment.apiUrl + '/products/' + id);
  }

  updateProduct(id: string, product: Product) {
    return this.httpClient.put<Product>(environment.apiUrl + '/products/' + id, product);
  }

}
