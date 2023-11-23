import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  contextPath = 'http://localhost:2002/';
  getCustomerOrdersEndPoint = this.contextPath + 'user/allplacedorders';
  getAuthorBookOrdersEndPoint = this.contextPath + 'author/getorder/author';
  getAllOrdersEndPoint = this.contextPath + 'admin/orderlist';
  updateOrderStatusEndPoint = this.contextPath + 'admin/orderstatus';
  constructor(private api: HttpClient) {}
  doGetAllCustomerOrders(): Observable<any> {
    let username = localStorage.getItem('Username') || '';
    return this.api.get<any>(`${this.getCustomerOrdersEndPoint}`, {
      params: { username },
    });
  }
  doGetAllAuthorOrders(): Observable<any> {
    let authorname = localStorage.getItem('Username') || '';
    return this.api.get<any>(`${this.getAuthorBookOrdersEndPoint}`, {
      params: { authorname },
    });
  }
  doGetAllOrders(): Observable<any> {
    return this.api.get<any>(`${this.getAllOrdersEndPoint}`);
  }

  doUpdateOrderStatus(status: string, oid: number): Observable<any> {
    return this.api.put<any>(`${this.updateOrderStatusEndPoint}`, status, {
      params: { oid },
    });
  }
}
