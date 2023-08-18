import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOfComponent } from './liste-of.component';

describe('ListeOfComponent', () => {
  let component: ListeOfComponent;
  let fixture: ComponentFixture<ListeOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
