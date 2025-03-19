import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetilesInproductComponent } from './detiles-inproduct.component';

describe('DetilesInproductComponent', () => {
  let component: DetilesInproductComponent;
  let fixture: ComponentFixture<DetilesInproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetilesInproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetilesInproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
