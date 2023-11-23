import { Component } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  bookbyquantity: any[] = [];
  allbooks: any[] = [];
  __bookService: BookService;
  constructor(__bookService: BookService) {
    this.__bookService = __bookService;
  }
  ngOnInit() {
    this.__bookService.doLoadBooks().subscribe(
      (data) => {
        this.allbooks = [...data];
      },
      (err) => {
        console.log(err);
      }
    );
    this.__bookService.doLoadBooksByQuantity(5).subscribe(
      (data) => {
        this.bookbyquantity = [...data];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doAdd(quantity: string, title: string) {
    let count = Number(quantity);
    console.log(count);
    this.__bookService.doAddBookQuantity(count, title).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
