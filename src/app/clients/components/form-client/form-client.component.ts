import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from 'src/app/core/models/client';
import { StateClient } from '../../enums/state-client.enum';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  public form: FormGroup;
  public state = Object.values(StateClient);
  @Input() public client: Client = new Client();
  @Output() public submitted: EventEmitter<Client> = new EventEmitter();
  constructor(private formB: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formB.group({
      state: [this.client.state],
      id: [this.client.id],
      name: [this.client.name],
      ca: [this.client.ca],
      comment: [this.client.comment]
    });
  }

  public onSubmit() {
    this.submitted.emit(this.form.value);
  }
}
