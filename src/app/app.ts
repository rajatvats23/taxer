import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TaxCalculatorComponent } from './components/tax-calculator.component';
import { TaxSlabListComponent } from './components/tax-slab-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, TaxCalculatorComponent, TaxSlabListComponent],
  template: `
    <div class="container">
      <h1>Tax Management System</h1>
      
      <mat-tab-group>
        <mat-tab label="Tax Calculator">
          <app-tax-calculator />
        </mat-tab>
        <mat-tab label="Manage Tax Slabs">
          <app-tax-slab-list />
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    mat-tab-group {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class App {}