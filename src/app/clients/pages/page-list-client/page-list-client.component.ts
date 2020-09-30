import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { StateClient } from '../../enums/state-client.enum';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-client',
  templateUrl: './page-list-client.component.html',
  styleUrls: ['./page-list-client.component.scss']
})
export class PageListClientComponent implements OnInit {

  public clientsList: Client[];
  public headersTable: string[];
  public states = Object.values(StateClient);

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.clientService.collection.subscribe(
      (datas) => {
        this.clientsList = datas;
      }, (err) => {
        console.log(err);
      }
    );
    this.headersTable = [
      'Nom',
      'CA',
      'Commentaire',
      'State'
    ];
  }

  public changeState(item: Client, event) {
    this.clientService.changeState(item, event.target.value).subscribe(
      (result) => {
        item.state = result.state;
      }
    );
  }
}
