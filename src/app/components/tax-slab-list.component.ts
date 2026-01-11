// src/app/components/tax-slab-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaxSlabService } from '../services/tax-slab.service';
import { AuthService } from '../services/auth.service';
import { TaxSlab } from '../models/tax-slab.model';

@Component({
  selector: 'app-tax-slab-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tax-slab-list.component.html',
  styleUrls: ['./tax-slab-list.component.css']
})
export class TaxSlabListComponent implements OnInit {
  private taxSlabService = inject(TaxSlabService);
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  slabs = signal<TaxSlab[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  editingId = signal<number | null>(null);
  
  readonly Infinity = Infinity;
  displayedColumns: string[] = ['minIncome', 'maxIncome', 'taxRate', 'actions'];

  editForm = this.fb.group({
    minIncome: [0, [Validators.required, Validators.min(0)]],
    maxIncome: [0, [Validators.required, Validators.min(0)]],
    taxRate: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  ngOnInit(): void {
    this.loadSlabs();
  }

  loadSlabs(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.taxSlabService.getAll().subscribe({
      next: (slabs) => {
        this.slabs.set(slabs);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tax slabs');
        this.loading.set(false);
        console.error('Load error:', err);
      }
    });
  }

  startEdit(slab: TaxSlab): void {
    if (!this.authService.canEdit()) {
      this.error.set('You do not have permission to edit');
      return;
    }
    
    this.editingId.set(slab.id);
    this.editForm.patchValue({
      minIncome: slab.minIncome,
      maxIncome: slab.maxIncome === Infinity ? 999999999 : slab.maxIncome,
      taxRate: slab.taxRate
    });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editForm.reset();
    this.error.set(null);
  }

  saveEdit(id: number): void {
    if (!this.authService.canEdit()) {
      this.error.set('You do not have permission to edit');
      return;
    }

    if (this.editForm.invalid) {
      this.error.set('Please enter valid values');
      return;
    }

    const values = this.editForm.value;
    this.loading.set(true);
    
    this.taxSlabService.update(id, {
      minIncome: values.minIncome!,
      maxIncome: values.maxIncome!,
      taxRate: values.taxRate!
    }).subscribe({
      next: () => {
        this.editingId.set(null);
        this.error.set(null);
        this.loadSlabs();
      },
      error: (err) => {
        this.error.set('Failed to update tax slab');
        this.loading.set(false);
        console.error('Update error:', err);
      }
    });
  }

  deleteSlab(id: number): void {
    if (!this.authService.canDelete()) {
      this.error.set('You do not have permission to delete');
      return;
    }

    if (confirm('Are you sure you want to delete this tax slab?')) {
      this.loading.set(true);
      this.taxSlabService.delete(id).subscribe({
        next: () => {
          this.error.set(null);
          this.loadSlabs();
        },
        error: (err) => {
          this.error.set('Failed to delete tax slab');
          this.loading.set(false);
          console.error('Delete error:', err);
        }
      });
    }
  }
}