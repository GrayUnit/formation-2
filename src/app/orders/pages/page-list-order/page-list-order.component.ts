import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-order',
  templateUrl: './page-list-order.component.html',
  styleUrls: ['./page-list-order.component.scss']
})
export class PageListOrderComponent implements OnInit, OnDestroy {

  public orders: Order[];
  public collectionOrders$: Observable<Order[]>;
  public tableHeaders: string[];
  public states = Object.values(StateOrder);
  public subscription: Subscription;

  constructor(
    private orderService: OrdersService,
    private router: Router) { }

  ngOnInit(): void {
    // this.subscription = this.orderService.collection.subscribe(
    //   (datas) => {
    //     this.orders = datas;
    //   }
    // );
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false };
    this.collectionOrders$ = this.orderService.collection;
    this.tableHeaders = [
      "Type",
      "Client",
      "Nb. Jours",
      "Tjm HT",
      "Total HT",
      "Total TTC",
      "State",
      "Actions"
    ]
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  public changeState(item: Order, event) {
    this.orderService.changeState(item, event.target.value).subscribe(
      (result) => {
        item.state = result.state;
      }, (err) => {
        event.target.value = item.state;
      }
    );


  }

  public testButton() {

  }

  public edit(item: Order) {
    this.router.navigate(['orders', 'edit', item.id]);
  }

}
