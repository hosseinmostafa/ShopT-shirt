import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymantComponent } from './pymant.component';

describe('PymantComponent', () => {
  let component: PymantComponent;
  let fixture: ComponentFixture<PymantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PymantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PymantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
