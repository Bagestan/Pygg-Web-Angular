import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarsComponent } from './Bars.component';

describe('BarsComponent', () => {
  let component: BarsComponent;
  let fixture: ComponentFixture<BarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
