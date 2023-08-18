import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChaineComponent } from './add-chaine.component';

describe('AddChaineComponent', () => {
  let component: AddChaineComponent;
  let fixture: ComponentFixture<AddChaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
