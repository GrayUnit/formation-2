import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/core/models/order';
import { DependencyValidator } from 'src/app/shared/validators/depency-validator';
import { StateOrder } from '../../enums/state-order.enum';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {


  public form: FormGroup;
  @Input() public order: Order = new Order();
  public states = Object.values(StateOrder);
  @Output() submitted: EventEmitter<Order> = new EventEmitter();

  constructor(private formB: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formB.group({
      tjmHt: [this.order.tjmHt],
      nbJours: [this.order.nbJours],
      tva: [this.order.tva],
      state: [this.order.state, ],
      typePresta: [this.order.typePresta],
      client: [this.order.client, Validators.compose([Validators.required, Validators.minLength(5)])],
      comment: [this.order.comment],
      id: [this.order.id]
    }, {validators: Validators.compose([DependencyValidator("client", ["tjmHt", "nbJours"])])});
  }

  test() {
    debugger;
  }

  public onSubmit() {
    this.submitted.emit(this.form.value);
  }

}
