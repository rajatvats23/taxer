// src/app/components/tax-slab-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxSlabService } from '../services/tax-slab.service';
import { AuthService } from '../services/auth.service';
import { TaxSlab } from '../models/tax-slab.model';

@Component({
  selector: 'app-tax-slab-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-slab-list.component.html',
  styleUrls: ['./tax-slab-list.component.css']
})
export class TaxSlabListComponent implements OnInit {
  private taxSlabService = inject(TaxSlabService);
  authService = inject(AuthService);

  slabs = signal<TaxSlab[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  readonly Infinity = Infinity;

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
      error: () => {
        this.error.set('Failed to load tax slabs');
        this.loading.set(false);
      }
    });
  }

  deleteSlab(id: number): void {
    if (!this.authService.canDelete()) {
      this.error.set('You do not have permission to delete');
      return;
    }

    if (confirm('Are you sure you want to delete this tax slab?')) {
      this.taxSlabService.delete(id).subscribe({
        next: () => this.loadSlabs(),
        error: () => this.error.set('Failed to delete tax slab')
      });
    }
  }
}