import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationScreenComponent } from './reservation-screen.component';

describe('ReservationScreenComponent', () => {
  let component: ReservationScreenComponent;
  let fixture: ComponentFixture<ReservationScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationScreenComponent]
    });
    fixture = TestBed.createComponent(ReservationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
