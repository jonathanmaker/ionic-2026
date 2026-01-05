import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuoteFormComponent } from './quote-form.component';

describe('QuoteFormComponent', () => {
  let component: QuoteFormComponent;
  let fixture: ComponentFixture<QuoteFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [QuoteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
