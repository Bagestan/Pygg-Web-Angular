import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQualityComponent } from './form-quality.component';

describe('FormQualityComponent', () => {
  let component: FormQualityComponent;
  let fixture: ComponentFixture<FormQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQualityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
