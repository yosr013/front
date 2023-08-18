import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreDetailsComponent } from './ordre-details.component';

describe('OrdreDetailsComponent', () => {
  let component: OrdreDetailsComponent;
  let fixture: ComponentFixture<OrdreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
