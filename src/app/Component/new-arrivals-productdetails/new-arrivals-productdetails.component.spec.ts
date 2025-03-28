import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalsProductdetailsComponent } from './new-arrivals-productdetails.component';

describe('NewArrivalsProductdetailsComponent', () => {
  let component: NewArrivalsProductdetailsComponent;
  let fixture: ComponentFixture<NewArrivalsProductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewArrivalsProductdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArrivalsProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
