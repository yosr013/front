import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieOfComponent } from './suivie-of.component';

describe('SuivieOfComponent', () => {
  let component: SuivieOfComponent;
  let fixture: ComponentFixture<SuivieOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivieOfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivieOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
