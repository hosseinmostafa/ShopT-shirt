import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritProblemComponent } from './writ-problem.component';

describe('WritProblemComponent', () => {
  let component: WritProblemComponent;
  let fixture: ComponentFixture<WritProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WritProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
