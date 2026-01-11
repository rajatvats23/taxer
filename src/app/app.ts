// src/app/app.ts
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaxCalculatorComponent } from './components/tax-calculator.component';
import { TaxSlabListComponent } from './components/tax-slab-list.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatButtonModule,
    MatCardModule,
    TaxCalculatorComponent, 
    TaxSlabListComponent
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Tax Management System</h1>
        
        <mat-card class="user-info">
          <mat-card-content>
            <div class="user-details">
              <p><strong>User:</strong> {{ authService.user()?.name }}</p>
              <p><strong>Role:</strong> {{ authService.user()?.role }}</p>
            </div>
            <div class="user-actions">
              @if (authService.isAdmin()) {
                <button mat-raised-button color="primary" (click)="authService.switchToUser()">
                  Switch to User
                </button>
              } @else {
                <button mat-raised-button color="primary" (click)="authService.switchToAdmin()">
                  Switch to Admin
                </button>
              }
              <button mat-raised-button color="warn" (click)="authService.logout()">
                Logout
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
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
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    h1 {
      margin: 0;
      color: #2c3e50;
    }
    
    .user-info {
      min-width: 300px;
    }
    
    .user-details {
      margin-bottom: 15px;
    }
    
    .user-details p {
      margin: 5px 0;
    }
    
    .user-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    mat-tab-group {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
      }
      
      .user-info {
        width: 100%;
      }
    }
  `]
})
export class App {
  authService = inject(AuthService);
}