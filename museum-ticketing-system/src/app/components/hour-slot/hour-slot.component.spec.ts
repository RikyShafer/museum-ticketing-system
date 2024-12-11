import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSlotComponent } from './hour-slot.component';

describe('HourSlotComponent', () => {
  let component: HourSlotComponent;
  let fixture: ComponentFixture<HourSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
