import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaxCalculatorComponent } from './components/tax-calculator.component';
import { TaxSlabListComponent } from './components/tax-slab-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaxCalculatorComponent, TaxSlabListComponent],
  template: `
    <div class="container">
      <h1>Tax Management System</h1>
      <app-tax-calculator />
      <app-tax-slab-list />
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
      margin-bottom: 40px;
    }
  `]
})
export class App {
  protected readonly title = signal('taxer');
}