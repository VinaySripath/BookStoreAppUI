import { Component } from '@angular/core';
import { AddBook } from 'src/app/DTO/add-book';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  isExisting: boolean = false;
  dto: AddBook = new AddBook('', '', 0, 0, '');
  __bookService: BookService;

  constructor(__bookService: BookService) {
    this.__bookService = __bookService;
  }

  doAddBook() {
    if (this.isExisting != true) {
      let user = localStorage.getItem('Username') || '';
      if (user != null) {
        this.__bookService.doPublishBooks(this.dto, user).subscribe(
          (data) => {
            console.log(data);
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  doCheckTitle() {
    this.__bookService.doLoadBooks().subscribe(
      (data) => {
        console.log(data);
        for (let book of data) {
          if (book.title === this.dto.title) {
            this.isExisting = true;
            return;
          }
        }
        this.isExisting = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
