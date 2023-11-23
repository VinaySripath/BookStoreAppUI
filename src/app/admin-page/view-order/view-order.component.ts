import { Component } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent {
  __orderService: OrderService;
  currentOrders: any[] = [];
  allOrders: any[] = [];
  constructor(__orderService: OrderService) {
    this.__orderService = __orderService;
  }
  ngOnInit() {
    this.__orderService.doGetAllOrders().subscribe(
      (data) => {
        console.log(data);
        this.allOrders = [...data];
        for (let order of data) {
          if (order.orderStatus === 'placed successfully') {
            this.currentOrders = [...this.currentOrders, order];
          }
        }
        console.log(this.currentOrders);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  doUpdateStatus(status: string, orderNumber: number) {
    if (status != '') {
      this.__orderService.doUpdateOrderStatus(status, orderNumber).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
