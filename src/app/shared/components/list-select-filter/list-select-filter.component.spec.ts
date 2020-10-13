import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSelectFilterComponent } from './list-select-filter.component';

describe('ListSelectFilterComponent', () => {
  let component: ListSelectFilterComponent;
  let fixture: ComponentFixture<ListSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSelectFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
