import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-select-filter',
  templateUrl: './list-select-filter.component.html',
  styleUrls: ['./list-select-filter.component.scss']
})
export class ListSelectFilterComponent implements OnInit, OnChanges {

  @Input() itemCollection: Observable<any[]>;
  @Input() initalSelection: any[];
  @Output() onchange: EventEmitter<any> = new EventEmitter();

  public collection: any[] = [];
  private _collection: any[] = [];

  private initialized: boolean = false;
  private subscription: Subscription;

  searchText: string = "";
  selected_count: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.itemCollection.subscribe(
      (col) => {
        this._collection = col;
        // this.collection = col;
        this.handleNewCollection();
        
        if (!this.initialized && this.collection.length > 0) {
          this.selectAllItems();
          this.initialized = true;
        }
      }
    );
  }

  ngOnChanges(changes): void {
    if (changes.initalSelection) {
      let selected_temp = [];
      for (let item of this.collection) {
        if (this.initalSelection.find(i => i.id == item.id)) {
          item.selected = true;
          selected_temp.push(item);
        } else {
          item.selected = false;
        }
      }
      this.countSelected();
      this.onchange.emit(selected_temp);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private countSelected(): void {
    this.selected_count = this.collection.filter(i => i.selected == true).length;
  }

  private handleNewCollection(): void {
    if (this.collection.length > 0) {
      for (let newItem of this._collection) {
        let oldItem = this.collection.find((item) => { if (item.id == newItem.id) { return true; } });
        if (oldItem !== undefined) {
          newItem.selected = oldItem.selected;
        } else {
          newItem.selected = false;
        }
      }
    } else {
      for (let newItem of this._collection) {
        newItem.selected = false;
      }
    }
    this.collection = this._collection;
    this.countSelected();
  }

  public getSelectedCount(): number {
    return this.selected_count;
  }

  public getSelectedCountAsString(): string {
    return this.selected_count + '';
  }

  public onItemClick(item) {
    let temp = this.collection.filter(i => {
      if (i.id == item.id) {
        i.selected = !item.selected;
      }
      if (i.selected) {
        return true;
      }
    });
    this.selected_count = temp.length;
    this.onchange.emit(temp);
  }

  public selectAllItems() {
    let temp = this.collection.filter(i => {
      if (!i.selected) { i.selected = true }
      return true;
    });
    this.selected_count = temp.length;
    this.onchange.emit(temp);
    this.searchText = "";
  }

  public clearAllItems() {
    let temp = this.collection.filter(i => {
      if (i.selected) { i.selected = false }
    });
    this.selected_count = temp.length;
    this.onchange.emit(temp);
    this.searchText = "";
  }

  public clearSearch() {
    this.searchText = "";
  }


}
