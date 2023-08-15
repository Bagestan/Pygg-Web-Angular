import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcDensidadeComponent } from './calc-densidade.component';

describe('CalcDensidadeComponent', () => {
  let component: CalcDensidadeComponent;
  let fixture: ComponentFixture<CalcDensidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcDensidadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcDensidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
