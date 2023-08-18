import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaineProdComponent } from './chaine-prod.component';

describe('ChaineProdComponent', () => {
  let component: ChaineProdComponent;
  let fixture: ComponentFixture<ChaineProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaineProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaineProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
