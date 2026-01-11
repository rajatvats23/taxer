// src/app/services/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/tax-slab.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>({
    id: 1,
    name: 'John Doe',
    age: 35,
    income: 150000,
    role: 'admin'
  });

  user = this.currentUser.asReadonly();
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  hasRole(role: string): boolean {
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
}