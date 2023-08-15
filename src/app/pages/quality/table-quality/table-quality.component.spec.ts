import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQualityComponent } from './table-quality.component';

describe('TableQualityComponent', () => {
  let component: TableQualityComponent;
  let fixture: ComponentFixture<TableQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableQualityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
