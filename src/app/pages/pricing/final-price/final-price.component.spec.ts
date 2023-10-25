import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPriceComponent } from './final-price.component';

describe('FinalPriceComponent', () => {
  let component: FinalPriceComponent;
  let fixture: ComponentFixture<FinalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
