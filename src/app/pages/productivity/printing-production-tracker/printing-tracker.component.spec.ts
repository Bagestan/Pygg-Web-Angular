import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingProductionTrackerComponent } from './printing-production-tracker.component';

describe('PrintingProductionTrackerComponent', () => {
  let component: PrintingProductionTrackerComponent;
  let fixture: ComponentFixture<PrintingProductionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingProductionTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintingProductionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
