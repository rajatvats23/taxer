// src/app/models/tax-slab.model.ts
export interface TaxSlab {
  id: number;
  minIncome: number;
  maxIncome: number;
  taxRate: number;
}

export interface TaxCalculationResult {
  totalTax: number;
  effectiveRate: number;
  breakdown: {
    slab: TaxSlab;
    taxableAmount: number;
    taxAmount: number;
  }[];
}

export interface User {
  id: number;
  name: string;
  age: number;
  income: number;
  role: 'admin' | 'user';
}