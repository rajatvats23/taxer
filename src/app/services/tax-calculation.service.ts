// src/app/services/tax-calculation.service.ts
import { Injectable } from '@angular/core';
import { TaxSlab, TaxCalculationResult } from '../models/tax-slab.model';

@Injectable({
  providedIn: 'root'
})
export class TaxCalculationService {
  private taxSlabs: TaxSlab[] = [
    { id: 1, minIncome: 0, maxIncome: 50000, taxRate: 0 },
    { id: 2, minIncome: 50001, maxIncome: 100000, taxRate: 10 },
    { id: 3, minIncome: 100001, maxIncome: 200000, taxRate: 20 },
    { id: 4, minIncome: 200001, maxIncome: Infinity, taxRate: 30 }
  ];

  calculateTax(income: number, age: number): TaxCalculationResult {
    if (income < 0) {
      throw new Error('Income cannot be negative');
    }

    let remainingIncome = income;
    let totalTax = 0;
    const breakdown = [];

    const deduction = age >= 60 ? 50000 : 0;
    remainingIncome = Math.max(0, remainingIncome - deduction);

    for (const slab of this.taxSlabs) {
      if (remainingIncome <= 0) break;

      const slabRange = slab.maxIncome - slab.minIncome;
      const taxableAmount = Math.min(remainingIncome, slabRange);
      const taxAmount = (taxableAmount * slab.taxRate) / 100;

      if (taxableAmount > 0) {
        breakdown.push({ slab, taxableAmount, taxAmount });
        totalTax += taxAmount;
        remainingIncome -= taxableAmount;
      }
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    return { totalTax, effectiveRate, breakdown };
  }

  getTaxSlabs(): TaxSlab[] {
    return [...this.taxSlabs];
  }
}