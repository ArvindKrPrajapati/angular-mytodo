import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarryComponent } from './starry.component';

describe('StarryComponent', () => {
  let component: StarryComponent;
  let fixture: ComponentFixture<StarryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
