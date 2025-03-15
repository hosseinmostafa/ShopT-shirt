import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayServesesInDashpordComponent } from './pay-serveses-in-dashpord.component';

describe('PayServesesInDashpordComponent', () => {
  let component: PayServesesInDashpordComponent;
  let fixture: ComponentFixture<PayServesesInDashpordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayServesesInDashpordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayServesesInDashpordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
