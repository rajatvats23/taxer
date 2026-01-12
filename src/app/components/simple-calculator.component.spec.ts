import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleCalculatorComponent } from './simple-calculator.component';

describe('SimpleCalculatorComponent', () => {
  let component: SimpleCalculatorComponent;
  let fixture: ComponentFixture<SimpleCalculatorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleCalculatorComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SimpleCalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial tax as zero', () => {
    const taxResult = compiled.querySelector('[data-testid="tax-result"]');
    expect(taxResult?.textContent).toContain('Tax: ₹0');
  });

  it('should calculate tax when user enters income', () => {
    const input = compiled.querySelector('[data-testid="income-input"]') as HTMLInputElement;
    
    input.value = '100000';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const taxResult = compiled.querySelector('[data-testid="tax-result"]');
    expect(taxResult?.textContent).toContain('Tax: ₹5000');
  });

  it('should reset income and tax when reset button clicked', () => {
    // Set some values first
    const input = compiled.querySelector('[data-testid="income-input"]') as HTMLInputElement;
    input.value = '100000';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.income()).toBe(100000);
    expect(component.tax()).toBe(5000);
    
    // Click reset
    const resetBtn = compiled.querySelector('[data-testid="reset-btn"]') as HTMLButtonElement;
    resetBtn.click();
    fixture.detectChanges();
    
    // Check reset worked
    expect(component.income()).toBe(0);
    expect(component.tax()).toBe(0);
  });
});