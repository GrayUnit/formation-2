import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss']
})
export class PageEditOrderComponent implements OnInit {

  public item$: Observable<Order>;
  private currentActiveModal: NgbModalRef;
  @ViewChild('updateOrderModal') public updateModalRef: TemplateRef<any>;
  private modalValues: Order;


  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private orderService: OrdersService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    // Récupération d'un paramètre du routeur depuis l'url
    // this.currentRoute.paramMap.subscribe(
    //   (params) => {
    //     console.log(params.get("id"));
    //   }
    // );
    this.item$ = this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.orderService.getItemById(params.get("id"))
      })
    )
  }

  public updateOrder() {
    this.orderService.updateItem(this.modalValues).subscribe(
      (result) => {
        this.dismiss();
        this.router.navigate(["orders"]);
      }
    );
  }

  public openUpdateModal(values) {
    this.modalValues = values;
    this.currentActiveModal = this.modalService.open(this.updateModalRef);
  }

  public dismiss() {
    this.currentActiveModal.dismiss();
  }

}
