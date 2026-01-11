// src/app/components/tax-calculator.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaxCalculationService } from '../services/tax-calculation.service';
import { TaxCalculationResult } from '../models/tax-slab.model';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent {
  private fb = inject(FormBuilder);
  private taxService = inject(TaxCalculationService);

  result = signal<TaxCalculationResult | null>(null);
  error = signal<string | null>(null);

  taxForm = this.fb.group({
    income: [0, [Validators.required, Validators.min(0)]],
    age: [25, [Validators.required, Validators.min(0), Validators.max(120)]]
  });

  calculate(): void {
    if (this.taxForm.invalid) {
      this.error.set('Please enter valid values');
      return;
    }

    this.error.set(null);
    const { income, age } = this.taxForm.value;

    try {
      this.result.set(this.taxService.calculateTax(income!, age!));
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Calculation error');
      this.result.set(null);
    }
  }

  reset(): void {
    this.taxForm.reset({ income: 0, age: 25 });
    this.result.set(null);
    this.error.set(null);
  }
}