import { Component } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { OrderService } from 'src/app/Service/order.service';

@Component({
  selector: 'app-book-orders',
  templateUrl: './book-orders.component.html',
  styleUrls: ['./book-orders.component.css'],
})
export class BookOrdersComponent {
  __orderService: OrderService;
  __bookService: BookService;
  authorname = localStorage.getItem('Username') || '';
  allOrders: any[] = [];
  mybooks: any = [];
  totalSales: number = 0;
  constructor(__orderService: OrderService, __bookService: BookService) {
    this.__orderService = __orderService;
    this.__bookService = __bookService;
  }
  ngOnInit() {
    this.__bookService.doLoadAuthorBooks(this.authorname).subscribe(
      (data) => {
        console.log(data);
        this.mybooks = [...data];
      },
      (err) => {
        console.log(err);
      }
    );
    this.__orderService.doGetAllAuthorOrders().subscribe(
      (data) => {
        console.log(data.orderDetails);
        this.allOrders = [...data];
        for (let order of this.allOrders) {
          for (let details of order.orderDetails) {
            console.log(details);
            for (let book of this.mybooks) {
              if (details.bookName === book.title) {
                this.totalSales += book.price * details.units;
              }
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
