import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFormationComponent } from './price-formation.component';

describe('PriceFormationComponent', () => {
  let component: PriceFormationComponent;
  let fixture: ComponentFixture<PriceFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
