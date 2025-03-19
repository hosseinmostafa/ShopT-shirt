import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductDetailsComponent } from './home-product-details.component';

describe('HomeProductDetailsComponent', () => {
  let component: HomeProductDetailsComponent;
  let fixture: ComponentFixture<HomeProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
