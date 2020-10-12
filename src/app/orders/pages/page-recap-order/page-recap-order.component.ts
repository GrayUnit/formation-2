import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, concat, forkJoin, interval, merge, Observable, Subject } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { Order } from 'src/app/core/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-recap-order',
  templateUrl: './page-recap-order.component.html',
  styleUrls: ['./page-recap-order.component.scss']
})
export class PageRecapOrderComponent implements OnInit {

  //public collectionOrders$: Observable<Order[]>;
  public states = Object.values(StateOrder);
  public tableHeaders: string[];

  public collectionOrders: Order[];
  public collectionOrders2: Order[];

  public listCollection$: Observable<[Order[], Order[]]>;

  constructor(
    private orderService: OrdersService,
    private clientService: ClientsService,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.collectionOrders$ = this.currentRoute.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     return this.clientService.getItemById(params.get("id")).pipe(
    //       switchMap((client) => {
    //         return this.orderService.getOrdersByClientName(client.name);
    //       })
    //     )
    //   })
    // );
    //MERGE MAP
    // this.collectionOrders$ = this.currentRoute.paramMap.pipe(
    //   mergeMap((params: ParamMap) => {
    //     return this.clientService.getItemById(params.get("id")).pipe(
    //       switchMap((client) => {
    //         return this.orderService.getOrdersByClientName(client.name);
    //       })
    //     )
    //   })
    // );

    // Fork join
    this.listCollection$ = this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.clientService.getItemById(params.get("id")).pipe(
          switchMap((client) => {
            return this.orderService.getAllOrdersByClientName(client.name);
          })
        )
      })
    );

    this.listCollection$.subscribe(
      (cols) => {
        this.collectionOrders = cols[0];
        this.collectionOrders2 = cols[1];
      }
    )

 
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

}
