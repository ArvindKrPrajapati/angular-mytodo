import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPendingComponent } from './previous-pending.component';

describe('PreviousPendingComponent', () => {
  let component: PreviousPendingComponent;
  let fixture: ComponentFixture<PreviousPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
