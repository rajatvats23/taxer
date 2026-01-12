import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-calculator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <input 
        type="number" 
        [value]="income()" 
        (input)="updateIncome($event)"
        data-testid="income-input">
      
      <p data-testid="tax-result">Tax: ₹{{ tax() }}</p>
      
      <button (click)="reset()" data-testid="reset-btn">Reset</button>
    </div>
  `
})
export class SimpleCalculatorComponent {
  income = signal(0);
  tax = signal(0);

  updateIncome(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.income.set(value);
    
    // Simple calculation: 10% tax if income > 50k
    this.tax.set(value > 50000 ? (value - 50000) * 0.1 : 0);
  }

  reset(): void {
    this.income.set(0);
    this.tax.set(0);
  }
}