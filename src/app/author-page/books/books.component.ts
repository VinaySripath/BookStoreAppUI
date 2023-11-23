import { Component } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  __bookService: BookService;
  books: any = [];
  mybooks: any = [];
  authorname = localStorage.getItem('Username') || '';
  constructor(__bookService: BookService) {
    this.__bookService = __bookService;
  }
  ngOnInit() {
    this.__bookService.doLoadBooks().subscribe(
      (data) => {
        this.books = [...data];
        for (let book of this.books) {
          this.__bookService.doLoadFeedbacks(book.title).subscribe(
            (data) => {
              let rating = 0;
              for (let review of data) {
                rating += review.ratings;
              }
              if (data.length != 0) {
                rating = rating / data.length;
              }
              book.review = Math.round(rating);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.__bookService.doLoadAuthorBooks(this.authorname).subscribe(
      (data) => {
        // console.log(data);
        this.mybooks = [...data];
        for (let book of this.mybooks) {
          let totalSales = 0;
          let unitssold = 0;
          this.__bookService.doLoadFeedbacks(book.title).subscribe(
            (data) => {
              let rating = 0;
              for (let review of data) {
                rating += review.ratings;
              }
              if (data.length != 0) {
                rating = rating / data.length;
              }
              book.review = Math.round(rating);
            },
            (err) => {
              console.log(err);
            }
          );
          this.__bookService.doGetBookOrders(book.title).subscribe(
            (data) => {
              let allOrders: any[] = [];
              allOrders = [...data];
              for (let order of allOrders) {
                for (let details of order.orderDetails) {
                  if (details.bookName === book.title) {
                    totalSales += details.units * book.price;
                    unitssold += details.units;
                  }
                }
              }
              book.totalsales = totalSales;
              book.unitssold = unitssold;
              console.log(book.totalsales);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
