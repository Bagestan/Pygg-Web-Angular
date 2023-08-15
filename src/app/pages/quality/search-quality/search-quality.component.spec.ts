import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQualityComponent } from './search-quality.component';

describe('SearchQualityComponent', () => {
  let component: SearchQualityComponent;
  let fixture: ComponentFixture<SearchQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchQualityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
