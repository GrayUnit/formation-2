import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export const maCol = [
  {title: 'un titre', subtitle: 'un sous titre', comment: 'un commentaire'},
  {title: 'un 2e titre', subtitle: 'un 2e sous titre', comment: 'un 2e commentaire'},
  {title: 'un 3e titre', subtitle: 'un 3e sous titre', comment: 'un 3e commentaire'}
];

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {

  public collection: any;
  public obs = new Observable((subscribers) => {
    subscribers.next(maCol);
  });
  public obsR = new Observable((subscribers) => {
    subscribers.next(Math.random());
  });
  public monSubject = new Subject();
  public monSubject2 = new Subject();
  public monBehaviorSubject = new BehaviorSubject(1);
  public monBehaviorSubject2 = new BehaviorSubject(Math.random());
  constructor() { }

  ngOnInit(): void {
    // Observable
    this.obs.subscribe((col) => {
      console.log(col);
      this.collection = col;
    });
    this.obsR.subscribe((col) => {
      console.log(col);
    });
    this.obsR.subscribe((col) => {
      console.log(col);
    });

    this.monSubject.next(1);


    // Subject
    this.monSubject.subscribe((res) => {
      console.log('flux Subject ' + res);
    });

    this.monSubject.next(2);
    this.monSubject.next(3);

    // Subject
    this.monSubject2.subscribe((res) => {
      console.log(res);
    });
    this.monSubject2.subscribe((res) => {
      console.log(res);
    });

    this.monSubject2.next(Math.random());

    // BehaviorSubject
    this.monBehaviorSubject.next(2);
    this.monBehaviorSubject.subscribe((res) => {
      console.log(res);
    });
    this.monBehaviorSubject.next(3);

    this.monBehaviorSubject2.subscribe((res) => {
      console.log(res);
    });
    this.monBehaviorSubject2.subscribe((res) => {
      console.log(res);
    });

    // récupérer de manière statique sans subscribe le dernier flux passé à mon Behavior
    console.log(this.monBehaviorSubject.value);

  }

}
