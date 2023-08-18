import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaillesComponent } from './tailles.component';

describe('TaillesComponent', () => {
  let component: TaillesComponent;
  let fixture: ComponentFixture<TaillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaillesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
