import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBaseComponent } from './data-base.component';

describe('DataBaseComponent', () => {
  let component: DataBaseComponent;
  let fixture: ComponentFixture<DataBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
