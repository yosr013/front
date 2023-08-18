import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreOfComponent } from './ordre-of.component';

describe('OrdreOfComponent', () => {
  let component: OrdreOfComponent;
  let fixture: ComponentFixture<OrdreOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreOfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdreOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
