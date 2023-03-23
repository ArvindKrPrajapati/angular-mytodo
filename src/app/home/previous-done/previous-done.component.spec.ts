import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDoneComponent } from './previous-done.component';

describe('PreviousDoneComponent', () => {
  let component: PreviousDoneComponent;
  let fixture: ComponentFixture<PreviousDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
