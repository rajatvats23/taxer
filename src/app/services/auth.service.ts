// src/app/services/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/tax-slab.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Default user is admin for demo purposes
  private currentUser = signal<User | null>({
    id: 1,
    name: 'Admin User',
    age: 35,
    income: 150000,
    role: 'admin'
  });

  user = this.currentUser.asReadonly();
  isAuthenticated = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  hasRole(role: 'admin' | 'user'): boolean {
    return this.currentUser()?.role === role;
  }

  canEdit(): boolean {
    return this.isAdmin();
  }

  canDelete(): boolean {
    return this.isAdmin();
  }

  login(user: User): void {
    this.currentUser.set(user);
  }

  logout(): void {
    this.currentUser.set(null);
  }

  // Switch between admin and regular user for testing
  switchToAdmin(): void {
    this.currentUser.set({
      id: 1,
      name: 'Admin User',
      age: 35,
      income: 150000,
      role: 'admin'
    });
  }

  switchToUser(): void {
    this.currentUser.set({
      id: 2,
      name: 'Regular User',
      age: 28,
      income: 80000,
      role: 'user'
    });
  }
}