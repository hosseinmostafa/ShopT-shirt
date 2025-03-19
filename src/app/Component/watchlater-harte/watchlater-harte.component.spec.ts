import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlaterHarteComponent } from './watchlater-harte.component';

describe('WatchlaterHarteComponent', () => {
  let component: WatchlaterHarteComponent;
  let fixture: ComponentFixture<WatchlaterHarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlaterHarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlaterHarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
