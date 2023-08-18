import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendementOuvrierComponent } from './rendement-ouvrier.component';

describe('RendementOuvrierComponent', () => {
  let component: RendementOuvrierComponent;
  let fixture: ComponentFixture<RendementOuvrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendementOuvrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendementOuvrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
