import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBook } from '../DTO/add-book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private api: HttpClient) {}
  contextPath = 'http://localhost:2002/';
  loadBooksEndPoint = this.contextPath + 'admin/allbooks';
  loadBooksUserEndPoint = this.contextPath + 'user/allbooks';
  loadBooksByAuthorEndPoint = this.contextPath + 'author/viewbook/author';
  loadBooksByQuantityEndPoint = this.contextPath + 'admin/allbooks/quantity';
  loadFeedBackEndPoint = this.contextPath + 'user/viewreview/book';
  loadBookOrdersEndPoint = this.contextPath + 'author/getorder/book';
  addBooksEndPoint = this.contextPath + 'admin/updateinventory';
  publishBookEndPoint = this.contextPath + 'author/add';

  doLoadBooks(): Observable<any> {
    return this.api.get<any>(`${this.loadBooksUserEndPoint}`);
  }

  doLoadAuthorBooks(authorname: string): Observable<any> {
    return this.api.get<any>(`${this.loadBooksByAuthorEndPoint}`, {
      params: { authorname },
    });
  }

  doPublishBooks(dto: AddBook, aname: string): Observable<any> {
    return this.api.post<any>(`${this.publishBookEndPoint}`, dto, {
      params: { aname },
    });
  }

  doLoadBooksByQuantity(quantity: number): Observable<any> {
    return this.api.get<any>(
      `${this.loadBooksByQuantityEndPoint + '?maxquant=' + quantity}`
    );
  }

  doLoadFeedbacks(title: string): Observable<any> {
    return this.api.get<any>(`${this.loadFeedBackEndPoint}`, {
      params: {
        bookname: title,
      },
    });
  }

  doGetBookOrders(bookname: string): Observable<any> {
    return this.api.get<any>(`${this.loadBookOrdersEndPoint}`, {
      params: {
        bookname: bookname,
      },
    });
  }

  doAddBookQuantity(quantity: number, title: string) {
    let dto = {
      availableQuantity: quantity,
      title: title,
    };
    return this.api.put<any>(`${this.addBooksEndPoint}`, dto);
  }
}
