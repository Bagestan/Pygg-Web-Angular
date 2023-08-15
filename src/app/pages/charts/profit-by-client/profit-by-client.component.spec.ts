import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitByClientComponent } from './profit-by-client.component';

describe('ProfitByClientComponent', () => {
  let component: ProfitByClientComponent;
  let fixture: ComponentFixture<ProfitByClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitByClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
