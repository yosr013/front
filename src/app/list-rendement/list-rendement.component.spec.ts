import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendementComponent } from './list-rendement.component';

describe('ListRendementComponent', () => {
  let component: ListRendementComponent;
  let fixture: ComponentFixture<ListRendementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRendementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRendementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
