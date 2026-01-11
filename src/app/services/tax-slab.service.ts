// src/app/services/tax-slab.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { TaxSlab } from '../models/tax-slab.model';

@Injectable({
  providedIn: 'root'
})
export class TaxSlabService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tax-slabs';
  
  private mockSlabs: TaxSlab[] = [
    { id: 1, minIncome: 0, maxIncome: 50000, taxRate: 0 },
    { id: 2, minIncome: 50001, maxIncome: 100000, taxRate: 10 },
    { id: 3, minIncome: 100001, maxIncome: 200000, taxRate: 20 },
    { id: 4, minIncome: 200001, maxIncome: Infinity, taxRate: 30 }
  ];

  getAll(): Observable<TaxSlab[]> {
    return of([...this.mockSlabs]).pipe(delay(300));
  }

  getById(id: number): Observable<TaxSlab | undefined> {
    return of(this.mockSlabs.find(s => s.id === id)).pipe(delay(200));
  }

  create(slab: Omit<TaxSlab, 'id'>): Observable<TaxSlab> {
    const newSlab = { ...slab, id: Date.now() };
    this.mockSlabs.push(newSlab);
    return of(newSlab).pipe(delay(300));
  }

  update(id: number, slab: Partial<TaxSlab>): Observable<TaxSlab> {
    const index = this.mockSlabs.findIndex(s => s.id === id);
    if (index !== -1) {
      this.mockSlabs[index] = { ...this.mockSlabs[index], ...slab };
      return of(this.mockSlabs[index]).pipe(delay(300));
    }
    throw new Error('Slab not found');
  }

  delete(id: number): Observable<void> {
    this.mockSlabs = this.mockSlabs.filter(s => s.id !== id);
    return of(void 0).pipe(delay(300));
  }
}