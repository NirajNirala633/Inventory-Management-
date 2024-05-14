import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Order from '../types/order';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  httpClient = inject(HttpClient)

  getOrders() {
    return this.httpClient.get<Order[]>(environment.apiUrl + '/orders');
  }

  addOrder(order: Order) {
    return this.httpClient.post<Order>(environment.apiUrl + '/orders', order);
  }

  getOrder(id: string) {
    return this.httpClient.get<Order>(environment.apiUrl + '/orders/' + id);
  }

  updateOrder(id: string, order: Order) {
      return this.httpClient.put<Order>(environment.apiUrl + '/orders/' + id, order);
    }

    deleteOrders(id: string) {
      return this.httpClient.delete(environment.apiUrl + '/orders/' + id);
    }
  }

